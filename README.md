# Formable

Formable is a JSON2HTML form builder. It relies on jQuery to provide an easy way to work with dynamic forms.

## basics
Formable accepts two parameters:

+ json: REQUIRED.
+ output: OPTIONAL.

If no output is provided Formable will return the form object, otherwise, will append it to the element with the ID specified.

## example JSON
`{'form':{'title':'titulo','url':'url','containerId':'id','id':'id','class':'class','submitText':'honey','fieldset':[{'type':'text','label':'Brand','name':'brand','id':'brand','class':'class'},{'type':'text','label':'Model','name':'model','id':'model','class':'class'},{'type':'radio','label':'Engine','name':'engine','id':'engine','class':'class','values':[['4L',1],['6L',2],['8L',3],['V6',4],['V8',5],['V10',6],['V12',7],['Rotatory',8]]}]}}`

## usage
###### import jQuery
`<script src='http://code.jquery.com/jquery-1.11.0.min.js'></script>`

###### import it
`<script src='formable.js'></script>`

###### get JSON
`var formJSON = {}`

###### make magic
`var form = new Formable(formJSON, 'output');`

## Contributing
To contribute to Formable we advice you to:
+ `fork`
+ `branch`
+ `code`
+ `commit`
+ `push`
+ `pull request`

Formable relies on Node.js and Grunt. You may need to install [node.js](http://nodejs.org) and Grunt `npm install -g grunt-cli`.
+ `npm install`
+ `grunt jasmine`
+ `grunt http-server`

Remember to run your tests before opening your pull request.

## credits  
+ [Vladimir Suarez](https://github.com/ls-vla)
+ [Ricardo Andrés Bello](https://github.com/ricardoaandres)


## MIT license
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
