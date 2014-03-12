describe("formable", function() {

  var formJSON = {
    'form':{
      //Form Data
      'title':'title',
      'url':'/submit_url',
      'containerId':'id',
      'id':'id',
      'class':'class',
      'submitText':'honey',

      // Fieldset Data     
      'fieldset':[
        // Field Data
        {'type':'text',
         'label':'Brand',
         'name':'brand',
         'id':'brand',
         'class':'class'},
        // Field Data
        {'type':'text',
         'label':'Model',
         'name':'model',
         'id':'model',
         'class':'class'},
        // Field Data
        {'type':'radio',
         'label':'Engine',
         'name':'engine',
         'id':'engine',
         'class':'class',
         'values':[
            ['4L',1],['6L',2],['8L',3],['V6',4],['V8',5],['V10',6],['V12',7],['Rotatory',8]
          ]}
      ]
    }
  }

  var form = new Formable(formJSON, 'output');

  it("contains a title named 'title' ", function() {
    expect($(form).attr('id')).toEqual('id');
  });

  it("contains a class named 'class' ", function() {
    expect($(form).attr('class')).toEqual('class');
  });

  it("contains a url named '/submit_url' ", function() {
    expect($(form).attr('url')).toEqual('/submit_url');
  });

  it("contains a title named 'title' ", function() {
    expect($(form).find('legend').text()).toEqual('title');
  });

})