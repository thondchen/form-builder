const schema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'configs': {
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string'
        },
        'validate':{ type: 'array',title:'Validate',items:{
          type:'object',
          properties:{
            clause:{type:'string',title:'Clause'},
            message:{type:'string',title:'Message'}
          }
        }}
      },
    },
    'ui':{
      'type':'object',
      'properties':{
        'classNames':{
          'type':'string'
        },
        'ui:widget':{
          'type':'string'
        }
      }
    }
  }
};


export default schema;
