// prototype pattern

(function(global, $) {

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
        if (typeof data.type == undefined) {
          return { status: 'error', content: 'Missing Property: Data has no form.fieldset[listElementIndex].type' }
        }else{
          fieldsetType = data.type;
        }

        if (typeof data.label == undefined) {
          return { status: 'error', content: 'Missing Property: Data has no form.fieldset[listElementIndex].label' }
        }else{
          fieldsetLabel = data.label;
        }

        // Add Field Attributes
        if (!(typeof data.id == undefined)) {
          fieldAttributes.id = data.id;
        }else{
          fieldAttributes.id = data.label;
        }

        if (!(typeof data.name == undefined)) {
          fieldAttributes.name = data.name;
        }else{
          fieldAttributes.name = data.label;
        }

        if (!(typeof data.class == undefined)) {
          fieldAttributes.class = inputBootstrapClass + ' ' + data.class;
        }else{
          fieldAttributes.class = inputBootstrapClass;
        }
        
        // Text Field
        if (fieldsetType == 'text') {
          // Set type and create field container with bootstrap class
          fieldAttributes.type = fieldsetType; 
          $field = this.fieldContainer();
          // Append label and input to field container
          $field.append($('<label>', {for: data.label, text: data.label}));
          $field.append($('<input>', fieldAttributes));
        }

        // Text Area
        if (fieldsetType == 'textarea') {
          // Set type and create field container with bootstrap class
          fieldAttributes.type = fieldsetType;
          if (typeof data.rows == undefined) {
            fieldAttributes.rows = 5;
          }else{
            fieldAttributes.rows = data.rows;
          }
            
          $field = this.fieldContainer();
          // Append label and input to field container
          $field.append($('<label>', {for: data.label, text: data.label}));
          $field.append($('<textarea>', fieldAttributes));
        }

        // Radio Buttons and Checkboxes
        if (fieldsetType == 'radio' || fieldsetType == 'checkbox') {
            // Validate Values
            if (typeof data.values == undefined) {
              return { status: 'error', content: 'Missing Property: Data has no form.fieldset[listElementIndex].values' }
            }

            if (data.values.length < 1) {
              return { status: 'error', content: 'Invalid: form.fieldset[listElementIndex].values attribute has no elements' }
            }


            // Set type and create field container with bootstrap class
            fieldAttributes.type = fieldsetType;
            fieldAttributes.name = data.label;
            fieldAttributes.class = '';            
            $field = this.fieldContainer();

            $.each(data.values, function(index, value){

              fieldAttributes.value = value[1];
              $radioContainer = $('<div>', {class: fieldsetType});
              $radioLabel = $('<label>');

              if (index==0 && fieldsetType == 'radio') {
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
        if(typeof data.fieldset === 'undefined'){
          return {status: 'error', content: 'Missing Property: Data has no form.fieldset attribute'}
        }

        if(data.fieldset.length < 1){
          return {status: 'error', content: 'Invalid: form.fieldset attribute has no elements'}
        }

        // Fieldset Variables
        var $fieldset = jQuery('<fieldset>'),
            fieldsetResult = {status: 'ok'};

        jQuery.each(data.fieldset, function(index, field){
          // Loop Variables
          var fieldAttributes = {};
          // Build Field Calling to Form.builder.field
          var builderResult = builder.field(field);

          if (builderResult.status == 'error') {
            fieldsetResult.status = 'error';
            fieldsetResult.content = builderResult.content;
            return {}
          }

          $fieldset.append(builderResult.content);
        });

        if (fieldsetResult.status == 'ok') {
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

        // Set form container (Optional)
        if (!(typeof data.containerId == undefined)) {
          form.setContainer(data.containerId);
        }

        // Set form legend
        if (typeof data.title == undefined ) {
          return { status: 'error', content: 'Missing Property: Data has no form.title attribute' }
        }else{
          elementsList.push(jQuery('<legend>', {text: data.title}));
        }

        // Add url attribute
        if (typeof data.url == undefined ) {
          return { status: 'error', content: 'Missing Property: Data has no form.url attribute' }
        }else{
          formAttributes.url = data.url;
        }

        // Add id attribute (Optional)
        if (!(typeof data.id == undefined)) {
          formAttributes.id = data.id;
        }

        // Add class attribute (Optional)
        if (!(typeof data.class == undefined)) {
          formAttributes.class = data.class;
        }

        // Build Form with formAttributes options
        $form = jQuery('<form>', formAttributes);

        // Add Fieldset (Calling to Form.builder.fieldset)
        builderResult = this.fieldset(data);

        if (builderResult.status == 'ok') {
          elementsList.push(builderResult.content);
        }else{
          return builderResult;
        }

        // Set submit button
        if (typeof data.submitText == undefined) {
          // TODO: Do stuff for not hardcode english text
          data.submitText = 'Send';
        }

        elementsList.push(jQuery('<button>', {type: 'submit', class: 'btn btn-default', text: data.submitText}));
        
        // Append Elements
        jQuery.each(elementsList, function(index, $element){
          $form.append($element);
        });
        
        if(this.container != null){
            this.container.append($form);
        }

        return {status: 'ok', content: $form}
    }

  }

  function Formable(json, container) {
    this.json = json;
    this.setContainer(container);

    return this;
  }

  Formable.prototype.generateForm = function() {
    var formData = this.json.form,
        builderResult = {},
        $form = null;

    // Return error when form not exist
    if (typeof formData == undefined ) {
      return 'Missing Property: Data has no form attribute'
    }

    builderResult = this.builder.form(formData);
    console.log(builderResult);
    return builderResult.content
  }

  Formable.prototype.getJSON = function() {
    return this.json;
  }

  Formable.prototype.setContainer = function(container) {
    this.container = jQuery('#' + container);
  }

  Formable.prototype.builder = builder;

  global.Formable = Formable;

})(this);