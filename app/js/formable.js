/*
  FORMABLE

  authors: Ricardo Andrés Bello, Vladimir Suarez

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

(function (window, $, undefined) {

  var builder = {

    fieldContainer: function() {
      return $('<div>', {class: 'form-group'});
    },

    field: function(data) {
      var fieldsetType = '',
          fieldsetLabel = '',
          fieldAttributes = {},
          $field = null,
          inputBootstrapClass = 'form-control';

      // Validate Field
      if (typeof data.type === 'undefined') {
        throw new Error('Missing Property: Data has no form.fieldset[listElementIndex].type');
      }else{
        fieldsetType = data.type;
      }

      if (typeof data.label === 'undefined') {
        throw new Error('Missing Property: Data has no form.fieldset[listElementIndex].label');
      }else{
        fieldsetLabel = data.label;
      }

      // Add Field Attributes
      fieldAttributes.id = (typeof data.id === 'undefined') ? fieldAttributes.id = data.label : fieldAttributes.id = data.id;
      fieldAttributes.name = (typeof data.name === 'undefined') ? fieldAttributes.name = data.label : fieldAttributes.name = data.name;
      fieldAttributes.class = (typeof data.class === 'undefined') ? inputBootstrapClass : inputBootstrapClass + ' ' + data.class;
      fieldAttributes.value = (typeof data.value === 'undefined') ? '' : data.value;

      // Text Field
      if (fieldsetType == 'text') {
        // Set type and create field container with bootstrap class
        fieldAttributes.type = fieldsetType;
        if(data.answer){
          fieldAttributes.value = data.answer
        }
        $field = this.fieldContainer();
        // Append label and input to field container
        $field.append($('<label>', {for: data.label, text: data.label}));
        $field.append($('<input>', fieldAttributes));
      }

      // Range Field
      if (fieldsetType === 'range') {
        fieldAttributes.type = fieldsetType;
        $field = this.fieldContainer();

        fieldAttributes.min = data.min;
        fieldAttributes.max = data.max;
        fieldAttributes.step = data.step;
        fieldAttributes.name = data.name;
        fieldAttributes.value = data.value;

        // Append label and input to field container
        $field.append($('<label>', {for: data.label, text: data.label}));
        var slider = $('<input>', fieldAttributes)
        if(data.answer){
          $(slider).val(data.answer)
        }
        $field.append(slider);
      }

      // Text Area
      if (fieldsetType === 'textarea') {
        // Set type and create field container with bootstrap class
        fieldAttributes.type = fieldsetType;

        if (typeof data.rows === 'undefined') {
          fieldAttributes.rows = 5;
        }else{
          fieldAttributes.rows = data.rows;
        }

        fieldAttributes.name = data.name;

        $field = this.fieldContainer();
        // Append label and input to field container
        $field.append($('<label>', {for: data.label, text: data.label}));

        var textarea = $('<textarea>', fieldAttributes).text(fieldAttributes.value);

        if(data.answer){
          // Add default value if any
          textarea.val(data.answer)
        }

        $field.append(textarea);
      }

      // Radio Buttons and Checkboxes
      if (fieldsetType == 'radio' || fieldsetType == 'checkbox') {
        // Validate Values
        if (typeof data.values === 'undefined') {
          throw new Error('Missing Property: Data has no form.fieldset[listElementIndex].values');
        }

        if (data.values.length < 1) {
          throw new Error('Invalid: form.fieldset[listElementIndex].values attribute has no elements');
        }


        // Set type and create field container with bootstrap class
        fieldAttributes.type = fieldsetType;
        fieldAttributes.name = data.label;
        fieldAttributes.class = '';
        $field = this.fieldContainer();

        $field.append($('<label>', {for: data.label, text: data.label}));

        $.each(data.values, function(index, value){
          fieldAttributes.checked = false;

          if (value.length >= 3) {
            fieldAttributes.checked = 'checked';
          }

          fieldAttributes.value = value[1];
          $radioContainer = $('<div>', {class: fieldsetType});
          $radioLabel = $('<label>');

          var answers = [];

          if(data["answer"]){
            if(typeof(data["answer"]) === "string"){
              answers = JSON.parse(data["answer"])
            }
            else{
              answers = data["answer"]
            }
          }

          if (index === 0 && fieldsetType === 'radio') {
            $radioLabel.append($('<input>', $.extend({}, fieldAttributes, {checked: 'checked'})));
          }else if (answers.indexOf(index) >= 0){
            $radioLabel.append($('<input>', $.extend({}, fieldAttributes, {checked: 'checked'})));
          }else{
            $radioLabel.append($('<input>', fieldAttributes));
          }

          $radioLabel.append(value[0]);
          $radioContainer.append($radioLabel);

          $field.append($radioContainer);
        });
      }

      return { status: 'ok', content: $field }
    },

    fieldset: function(data) {
      // Validate Fieldset
      if (typeof data.fieldset === 'undefined') {
        throw new Error('Missing Property: Data has no form.fieldset attribute');
      }

      if (data.fieldset.length < 1) {
        throw new Error('Invalid: form.fieldset attribute has no elements');
      }

      // Fieldset Variables
      var $fieldset = $('<fieldset>'),
          fieldsetResult = {status: 'ok'};

      $.each(data.fieldset, function(index, field){
        var fieldAttributes = {}, // Loop Variables
            builderResult = builder.field(field); // Build Field Calling to Form.builder.field

        if (builderResult.status === 'error') {
          fieldsetResult.status = 'error';
          fieldsetResult.content = builderResult.content;
          return {}
        }

        $fieldset.append(builderResult.content);
      });

      if (fieldsetResult.status === 'ok') {
        fieldsetResult.content = $fieldset;
      }else{
        fieldsetResult;
      }

      return fieldsetResult;
    },

    form: function(data){
      var formAttributes = {method: 'post', role: 'form'},
          elementsList   = [],
          $form          = null,
          $fieldset      = null,
          $submit        = null,
          builderResult  = {};

      // Set form legend
      if (typeof data.title === 'undefined' ) {
        throw new Error('Missing Property: Data has no form.title attribute');
      }else{
        elementsList.push($('<legend>', {text: data.title}));
      }

      // Add url attribute
      if (typeof data.url === 'undefined' ) {
        throw new Error('Missing Property: Data has no form.url attribute');
      }else{
        formAttributes.url = data.url;
      }

      // Add id attribute (Optional)
      if (!(typeof data.id === 'undefined')) {
        formAttributes.id = data.id;
      }

      // Add class attribute (Optional)
      if (!(typeof data.class === 'undefined')) {
        formAttributes.class = data.class;
      }

      // Build Form with formAttributes options
      $form = $('<form>', formAttributes);

      // Add Fieldset (Calling to Form.builder.fieldset)
      builderResult = this.fieldset(data);

      if (builderResult.status == 'ok') {
        elementsList.push(builderResult.content);
      }else{
        return builderResult;
      }

      // Set submit button
      if (typeof data.submitText === 'undefined') {
        // TODO: Do stuff for not hardcode english text
        data.submitText = 'Send';
      }

      elementsList.push($('<button>', {type: 'submit', class: 'btn btn-default', text: data.submitText}));

      // Append Elements
      $.each(elementsList, function(index, $element) {
        $form.append($element);
      });

      if (this.container != null) {
        this.container.append($form);
      }

      return { status: 'ok', content: $form }
    }

  }

  function Formable(json, container) {
    this.json = json;
    this.setContainer(container);
    form = this.generateForm();

    if (this.container) {
      $(this.container).append(form);
    }

    return form;
  }

  Formable.prototype.generateForm = function() {
    var formData = this.json.form,
        builderResult = {},
        $form = null;

    // Return error when form not exist
    if (typeof formData === 'undefined' ) {
      throw new Error('Missing Property: Data has no form attribute');
    }

    builderResult = this.builder.form(formData);

    return builderResult.content;
  }

  Formable.prototype.getJSON = function() {
    return this.json;
  }

  Formable.prototype.setContainer = function(container) {
    if(container){
      this.container = $('#' + container);
    }
  }

  Formable.prototype.builder = builder;

  window.Formable = Formable;

})(window, jQuery);
