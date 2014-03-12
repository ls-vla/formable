describe("Formable", function() {

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

  // Form Data Tests
  describe("Generated form", function() {
    var $form = new Formable(formJSON, 'output');

    it("has a id named 'id' ", function() {
      expect($($form).attr('id')).toEqual('id');
    });

    it("has a class named 'class' ", function() {
      expect($($form).attr('class')).toEqual('class');
    });

    it("has a url named '/submit_url' ", function() {
      expect($($form).attr('url')).toEqual('/submit_url');
    });

    it("has a legend element with text 'title' ", function() {
      expect($($form).find('legend').text()).toEqual('title');
    });

    // Fielset Data Tests
    describe("Fieldset", function() {
      var $fieldset = $($form).find('fieldset');

      it("contains 2 input elements with type text", function() {
        expect($($fieldset).find('input[type=text]').length).toEqual(2)
      });

      it("contains 8 input elements with type radio", function() {
        expect($($fieldset).find('input[type=radio]').length).toEqual(8)
      });

      // First Input Text Data
      describe("First text input", function() {
        $inputText = $($fieldset).find('input[type=text]').first();

        it("has id with value 'brand'", function() {  
          expect($($inputText).attr('id')).toEqual('brand');
        });

        it("has name with value 'brand'", function() {  
          expect($($inputText).attr('name')).toEqual('brand');
        });

        it("has class with value 'form-control class'", function() {  
          expect($($inputText).attr('class')).toEqual('form-control class');
        });        
      });

      // First Input Radio Data
      describe("First radio input", function() {
        $inputRadio = $($fieldset).find('input[type=radio]').first();

        it("has id with value 'engine'", function() {  
          expect($($inputRadio).attr('id')).toEqual('engine');
        });

        it("has name with value 'engine'", function() {  
          expect($($inputRadio).attr('name')).toEqual('Engine');
        });

        it("has value equal to 'asdfas'", function() {  
          expect($($inputRadio).val()).toEqual('1');
        });

      });

    });

  });
  

});