JavaScript Client for IBM Bluemix Globalization-as-a-Service
===
<!--
/*	
 * Copyright IBM Corp. 2015
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
-->

# What is this?

This is a JavaScript client and sample code for the
[IBM Globalization](https://www.ng.bluemix.net/docs/#services/Globalization/index.html#globalization)
Bluemix service.

# Node.js

Presently, the client is only available for [node.js](http://nodejs.org) client, but is expected to
support other JavaScript platforms, including browser frameworks.


## Node.js - using within Bluemix

Load the gaas client object as follows:

    var gaas = require('gaas')({ vcap: process.env.VCAP_SERVICES});
    
## Testing the API

This assumes you have a bound service in Bluemix named "IBM Globalization".
Running the test will create and delete various translation projects in your service!

View the VCAP credential information, and set it as a local parameter:

    set VCAP_SERVICES = { "IBM Globalization": [ { "name": "IBM Globalization", /* etc ....... */ } ]
    npm install
    npm test

Alternately,  the following variables affect the tests (and some sample code) if `VCAP_SERVICES` is not used:

* `GAAS_PROJECT` = project name to use
* `GAAS_API_KEY` = which api key to use
* `GAAS_API_URL` = URL of the endpoint. Should end with "/translate".


Initializing the client
==

Create the client object as below. The project can be set in the client object
to set a default project name for operations.


    var gaas = require('gaas')({
     url: 'https://<address of GaaS server>/translate',
     api: '<your API key>',
     project: '<your default project name>',
    });

If you have a service bound as the name `IBM Globalization`,
you can use this to fetch credentials from VCAP:

``` js
var gaas = require('gaas');
var Client = new gaas.Client({ vcap: process.env.VCAP_SERVICES, project: 'MyProject'});
```

Using APIs
==

Many of the APIs have this pattern:

`obj.function( { /*params*/ } ,  onSuccess, onFailure)`

`onSuccess()` is given an object with various contents.

`onFailure()` is called with an error message if it is an error.


All language ids are IETF BCP47 codes.

API Reference: `Client` client object
===

### Client.supportedTranslations

This function returns a map from source language(s) to target language(s).

    Client.supportedTranslations( {}, function onSuccess(translations), function onFailure(err) );

Result:

    translations = {
        en: [ 'fr', 'de', ... ]
    };

### Client.project

This function returns a new `Project` object that can be used for further access.
*Note* that this function does not create the project or fetch any information - see [Project.create](#Project.create)

    var myProject = Client.project('MyProject');

### Client.listProjects

This function fetches a map of Project objects corresponding to your current projects.

    Client.listProjects({}, onSuccess(projList), onFailure);

Result:

    projList = {
        MyProject: Project(...),
        MyOtherProject: Project(...),
        ...
    };

API Reference: `Project` object
===

### Project.id

This property returns the projectID of the project.

### Project.create

This function creates the project

    Project.create({}, onSuccess, onFailure);

### Project.remove

This function removes the project, immediately and irrevocably.

    Project.remove({}, onSuccess, onFailure);

### project.getInfo

This function returns a new Project object, with the same `id` but
populated with the current project status, `readerKey`, etc.

    Project.getInfo({}, function onSuccess(newProj), onFailure);
    console.log(newProj.readerKey);

REST APIs
===

The `rest_*` functions let you directly call the RESTful API.

These functions directly mirror the REST api on the Globalization service.

At present, the RESTful API docs are hosted
[here](https://gaas.mybluemix.net/translate/swagger/index.html)
and may be helpful reference.

### Client.rest_getInfo
See REST [`GET /service`](https://gaas.mybluemix.net/translate/swagger/index.html#!/service/getInfo)

This function fetches general information about the server,
including which translations are available.

    Client.rest_getInfo({}, function onSuccess(resp){}, function onFailure(err){});
    
Sample `resp`:
```
 {
  supportedTranslation:
  {
   en: [ 'de', 'es ]
  },
  status: 'success'
 }
```

* `resp.supportedTranslation` - this is a map from source languages to an array of bcp47
supported languages. This example shows that English can be translated to German and Spanish.

### Client.rest_getProjectList
See REST [`GET /projects`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/getProjectList)

This function lists the projects currently available to your api key.

~~~ js
Client.rest_getProjectList({}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {
    projects:
    [
        {
            id: 'MyProject',
            readerKey: '35adc240-9794-4035-af6b-fe4cdfff2804',
            translationStatusByLanguage:
            {
               de: { failed: 1 }
               fr: { completed: 1 }
            },
            sourceLanguage: 'en',
            targetLanguages: [ 'fr', 'de' ]
        },
        ...
    ],
    status: 'success'
  }
```

The response shows that this project has one language with a failed and one language with a complete
translation.

### Client.rest_createProject
See REST [`POST /projects`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/createProject)

This function creates a new project.

~~~ js
Client.rest_createProject({
  id: "MyOtherProject",
  sourceLanguage: "en",
  targetLanguages: [ "es", "fr" ]
}, function onSuccess(resp){}, function onFailure(err){});
~~~

### Client.rest_getProject
See REST [`GET /projects/{projectID}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/getProject)

This function gets information about one project.

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

### Client.rest_updateProject
See REST [`POST /projects/{projectID}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/updateProject)

Update project contents..

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

### Client.rest_deleteProject
See REST [`DELETE /projects/{projectID}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/deleteProject)

Delete a project and all translations..

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

### Client.rest_getResourceData
See REST [`GET /projects/{projectID}/{languageID}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/getResourceData)

Get the data for one translation

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

### Client.rest_updateResourceData
See REST [`POST /projects/{projectID}/{languageID}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/updateResourceData)

Update one key's entry

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

### Client.rest_deleteLanguage
See REST [`DELETE /projects/{projectID}/{languageID}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/deleteLanguage)

Delete a target language. Source language may not be deleted.

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

### Client.rest_getResourceEntry
See REST [`GET /projects/{projectID}/{languageID}/{resKey}`](https://gaas.mybluemix.net/translate/swagger/index.html#!/project/getResourceEntry)

Return a single key's entry

~~~ js
Client.rest_getProject({
  id: "MyOtherProject",
}, function onSuccess(resp){}, function onFailure(err){});
~~~

Sample `resp`:
```
 {}
```

LICENSE
===
Apache 2.0. See [LICENSE.txt](LICENSE.txt)
