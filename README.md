# formable.js

Formable is a JSON2HTML form builder. It relies on jQuery to provide an easy way to work with dynamic forms. The next major version will be jQuery-Independent.

## basics
Formable accepts two parameters:

+ json: REQUIRED.
+ output: OPTIONAL.

If no output is provided Formable will return the form object, otherwise, will search for the element matching the output selector.

## supported form fields

tag      | type     | attributes
---------|----------|-----------------------------------------------------
form     |          | `title`, `url`, `id`, `class`, `submitText`
input    | text     | `label`, `name`, `id`, `class`, `value`
input    | radio    | `label`, `name`, `id`, `class`, `values`
input    | checkbox | `label`, `name`, `id`, `class`, `values`
input    | range    | `label`, `name`, `id`, `class`, `min`, `max`, `step`, `value`
textarea |          | `label`, `name`, `id`, `class`, `rows`, `value`

## sample JSON
*Can also be found in* `sample_json.json`

```
{
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
        'class': '',
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
      }
    ]
  }
}

```

## usage
###### import jQuery
`<script src='http://code.jquery.com/jquery-1.11.0.min.js'></script>`

###### import formable
`<script src='js/formable.js'></script>`

###### get JSON
`var formJSON = {}`

###### make some magic
`var form = new Formable(formJSON, 'output');`

## Contributing
To contribute to Formable we advice you to:
+ `fork`
+ `branch`
+ `code`
+ `jasmine test (green)`
+ `commit`
+ `push`
+ `pull request`

To run Jasmine and the http-server you may need to install *node.js* and/or *Grunt*, `npm install -g grunt-cli`.
+ `npm install`
+ `grunt jasmine`
+ `grunt http-server`

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
