import React from 'react';
import Form from 'react-jsonschema-form';
import deepmerge from 'deepmerge';
import deepcopy from 'deepcopy';
import common from './_common.js';

import JavascriptEditor from 'form-custom-components/lib/widgets/codemirror.js';


const schema = deepmerge(deepcopy(common),{
  properties:{
    configs:{
      properties:{
        conditional:{
          type:'array',
          title:'Conditional Logic',
          items:{
            type:'object',
            title:'Condition',
            properties:{
              clause:{
                title:null,
                type:'string'
              },
              properties:{
                type:'array',
                title:null,
                items:{
                  type:'string'
                }
              }
            }
          }
        },
        conditionFun:{
          type:'string'
        }
      }
    }
  }
});

class Editor extends React.Component {
  constructor(props){
    super(props);
    console.log('editorrrrrrrrrrrrrrrrrrrrr');
    let _schema = deepcopy(schema);
    _schema.properties.configs.properties.required = {
      type:'array',
      uniqueItems:true,
      items:{
        type:'string',
        enum:props.node.children.map((c)=>c.name)
      }
    };
    Object.assign(_schema.properties.configs.properties.conditional.items.properties.properties,{
      type:'array',
      uniqueItems:true,
      items:{
        type:'string',
        enum:props.node.children.map((c)=>c.name)
      }
    });
    this.state = {
      schema:_schema,
      uiSchema:{
        configs:{
          required:{'ui:widget':'checkboxes'},
          conditional:{items:{properties:{'ui:widget':'checkboxes'}}},
          conditionFun:{'ui:widget':{component:JavascriptEditor}},
          'ui:order':['type','required','validate','conditional','conditionFun']
        }
      }
    };
  }
  componentWillReceiveProps(props){
    this.state.schema.properties.configs.properties.required.items.enum = props.node.children.map((a) => a.name);
  }
  onChange(e){
    this.props.onChange(e,e.formData);
  }

  render(){
    const node = this.props.node;
    const props = Object.assign(
      {},
      this.props, {
        schema:this.state.schema,
        uiSchema:this.state.uiSchema,
        formData:node,
        onChange:this.onChange.bind(this)
      }
    );
    return (<Form {...props} />);
  }
}

export default {
  filter: ({configs,ui})=>(configs.type==='object' && ui && ui['ui:field']==='fullConditional'),
  component: Editor
};
