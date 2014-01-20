Formable
======

```json
// Example
{
    "form" :    {

                    "title"       : "titulo (Required)",
                    "url"         : "url (Required)",
                    "containerId" : "id (Optional)",
                    "id"          : "id (Optional)",
                    "class"       : "class (Optional)",
                    "submitText"  : "asdfasdfasdf(Optional)",

                    "fieldset"    : [   
                                        {
                                            "type"   : "tipo (Required)",
                                            "label"  : "label (Required)",
                                            "name"   : "name (Optional Default)",
                                            "id"     : "id (Optional)",
                                            "class"  : "class (Optional)",

                                            // Text Area Data
                                            "rows"   : 5,

                                            // Radio Buttons Data
                                            "values" : [["opcion1", 1], ["opcion2", 2]],

                                            // Checkbox Data
                                            "values" : [["opcion1", 1], ["opcion2", 2]]
                                                
                                        }
                                    ]

                }


}
```


