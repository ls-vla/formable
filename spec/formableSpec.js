describe("formable", function() {

	var formJSON = {'form':{'title':'titulo','url':'url','containerId':'id','id':'id','class':'class','submitText':'honey','fieldset':[{'type':'text','label':'Brand','name':'brand','id':'brand','class':'class'},{'type':'text','label':'Model','name':'model','id':'model','class':'class'},{'type':'radio','label':'Engine','name':'engine','id':'engine','class':'class','values':[['4L',1],['6L',2],['8L',3],['V6',4],['V8',5],['V10',6],['V12',7],['Rotatory',8]]}]}}
	var form = new Formable(formJSON, 'output');
	var formData = form.getJSON();

  it("contains spec with an expectation", function() {
    expect(formData.form.class).toEqual('class');
  });

});