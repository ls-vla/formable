// prototype pattern

(function(global, $) {

  function Formable(json, container) {
    this.json = json;
    this.container = container;

    return this;
  }

  Formable.prototype.generateForm = function() {

  }

  Formable.prototype.getJSON = function() {
    return this.json;
  }

  global.Formable = Formable;

})(this, jQuery);