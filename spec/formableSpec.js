describe("Formable", function() {

  var formJSON = {
    'form': {
      'title': 'Register your Vehicle',
      'url': '/register',
      'id': 'register-vehicle-form',
      'class': 'register-vehicle-form',
      'submitText': 'Register',
      'fieldset': [
        {
          'type': 'text',
          'label': 'Brand/Manufacturer',
          'id': 'manufacturer',
          'name': 'manufacturer',
          'class': 'class',
          'value': 'Ford'
        },
        {
          'type': 'text',
          'label': 'Model',
          'name': 'model',
          'id': 'model',
          'class': '',
          'value': 'Mustang'
        },
        {
          'type': 'range',
          'label': 'Year',
          'name': 'year',
          'id': 'year',
          'class': '',
          'min': 1920,
          'max': 2014,
          'step': 1,
          'value': '1967'
        },
        {
          'type': 'radio',
          'label': 'Engine',
          'name': 'engine',
          'id': 'engine',
          'class': '',
          'values': [
            ['Single-Cylinder', 1],
            ['3L', 2],
            ['4L', 3],
            ['5L', 4, 'checked'],
            ['6L', 5],
            ['8L', 6],
            ['V2', 7],
            ['V4', 8],
            ['V6', 9],
            ['V8', 10],
            ['V10', 11],
            ['V12', 12],
            ['Rotatory', 13]
          ]
        },
        {
          'type': 'textarea',
          'label': 'Some description',
          'name': 'description',
          'id': 'description',
          'class': '',
          'value': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          'type': 'checkbox',
          'label': 'Extra features',
          'name': 'features',
          'id': 'features',
          'class': '',
          'values': [
            ['20\' Rims', 1],
            ['ABS', 2, 'checked'],
            ['Fat Rear Tires', 3],
            ['Two Tone Paint', 4, 'checked'],
            ['Trunk Audio', 5]
          ]
        }
      ]
    }
  };

  // Form Data Tests
  describe("Generated form", function() {
    var $form = new Formable(formJSON, 'output');

    it("has a id named 'id' ", function() {
      expect($($form).attr('id')).toEqual('register-vehicle-form');
    });

    it("has a class named 'class' ", function() {
      expect($($form).attr('class')).toEqual('register-vehicle-form');
    });

    it("has a url named '/submit_url' ", function() {
      expect($($form).attr('url')).toEqual('/register');
    });

    it("has a legend element with text 'Register your Vehicle' ", function() {
      expect($($form).find('legend').text()).toEqual('Register your Vehicle');
    });

    // Fielset Data Tests
    describe("Fieldset", function() {
      var $fieldset = $($form).find('fieldset');

      it("contains 2 input elements with type text", function() {
        expect($($fieldset).find('input[type=text]').length).toEqual(2)
      });

      it("contains 13 input elements with type radio", function() {
        expect($($fieldset).find('input[type=radio]').length).toEqual(13)
      });

      // First Input Text Data
      describe("First text input", function() {
        $inputText = $($fieldset).find('input[type=text]').first();

        it("has id with value 'manufacturer'", function() {
          expect($($inputText).attr('id')).toEqual('manufacturer');
        });

        it("has name with value 'manufacturer'", function() {
          expect($($inputText).attr('name')).toEqual('manufacturer');
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

        it("has value equal to 'Single-Cylinder'", function() {
          expect($($inputRadio).val()).toEqual('1');
        });

      });

      // Checkboxes
      describe("Checkboxes", function () {
        $checkboxes = $fieldset.find('input:checkbox');
        $checkedCheckboxes = $fieldset.find('input:checkbox:checked');

        it('has 5 checkboxes', function () {
          expect($checkboxes.length).toEqual(5)
        });

        it('has 2 selected options', function () {
          expect($checkedCheckboxes.length).toEqual(2);
        });
      });

      // Default Value for Inputs
      describe('Default Values', function () {
        it('Manufacturer has Ford', function () {
          expect($fieldset.find('#manufacturer').val()).toEqual('Ford');
        });

        it('Model has Mustang', function () {
          expect($fieldset.find('#model').val()).toEqual('Mustang');
        });

        it('Year has 1967', function () {
          pending();
          expect($fieldset.find('#year').val()).toEqual('1967');
        });

        it('Description has Lorem Ipsum...', function () {
          expect($fieldset.find('#description').val()).toEqual('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
        });
      });

    });

  });


});
