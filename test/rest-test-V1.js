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


describe('rest-test-v1', function() {
  it('TODO: port rest-test-V1 to rest-test.js');
});

return;

// describe('cleaning up', function() {
//     it('Cleanup: Should delete '+projectId+' (ignoring errs)', function(done) {
//         try {
//             gaasClient.rest_deleteProject({ projectID: projectId }, function good(err, resp) {
//               //if(err) { done(err); return; }
//               done();
//             });
//         } catch (e) { done(); }
//     });
//     it('Cleanup: Should delete '+projectId2+' (ignoring errs)', function(done) {
//         try {
//             gaasClient.rest_deleteProject({ projectID: projectId2 }, function good(err, resp) {
//               //if(err) { done(err); return; }
//               done();
//             });
//         } catch (e) { done(); }
//     });
// });

// /**
//  * probably been written before!
//  */
// function arrayToHash(o, k) {
//   var res = {};
//   if(o) {
//     for(var i in o) {
//       res[o[i][k]] = o[i];
//     }
//   }
//   return res;
// }

// describe('gaas-client', function() {
//     describe('getInfo', function() {
//         it('should contain English', function(done) {
//             gaasClient.rest_getInfo({}, function good(err, resp) {
//               if(err) { done(err); return; }
//               expect(resp.status).to.equal('success');
//               expect(resp.supportedTranslation).to.include.keys('en');
//               done();
//             });
//         });
//     });
//     describe('getProjectList', function() {
//         it('should not include ' + projectId + ' or ' + projectId2, function(done) {
//             gaasClient.rest_getProjectList({}, function good(err, resp) {
//               if(err) { done(err); return; }
//               expect(resp.status).to.equal('success');
//               expect(resp.projects).to.not.include(projectId);
//               expect(resp.projects).to.not.include(projectId2);
//               if(CLEANSLATE) expect(resp.projects).to.be.empty();
//               done();
//             });
//         });
//     });

//     describe('createProject(MyProject)', function() {
//         it('should let us create', function(done) {
//             gaasClient.rest_createProject({ body: {id: projectId, sourceLanguage: 'en', targetLanguages: ['es','qru']}}, function good(err, resp) {
//               if(err) { done(err); return; }
//               expect(resp.status).to.equal('success');
//               done();
//             });
//         });
//     });

//     describe('updateResourceData(en)', function() {
//         it('should let us update some data', function(done) {
//             gaasClient.rest_updateResourceData({projectID: projectId, languageID: 'en',
//                                      body: { data: sourceData, replace: false }},
//                                     function good(err, resp) {
//                                       if(err) { done(err); return; }
//                                         expect(resp.status).to.be.equal('success');
//                                         done();
//                                     });
//         });
//     });

//     describe('getProjectList [expect: MyProject]', function() {
//         it('should return our project in the list', function(done) {
//             gaasClient.rest_getProjectList({}, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 if(CLEANSLATE) expect(resp.projects.length).to.equal(1);
//                 var projs = arrayToHash(resp.projects, 'id');
//                 expect(projs).to.contain.keys(projectId);
//                 expect(resp.projects[0].sourceLanguage).to.equal('en');
//                 expect(projs[projectId].targetLanguages).to.include('es');
//                 expect(projs[projectId].targetLanguages).to.include('qru');
//                 expect(projs[projectId].targetLanguages).to.not.include('de');
//                 expect(projs[projectId].targetLanguages).to.not.include('zh-Hans');
//                 done();
//             });
//         });
//     });

//     describe('createProject', function() {
//         it('should let us create another', function(done) {
//             gaasClient.rest_createProject({ body: {id: projectId2, sourceLanguage: 'en', targetLanguages: ['de','zh-Hans']}}, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 done();
//             });
//         });
//     });

//     describe('getProjectList', function() {
//         it('should return our other project in the list', function(done) {
//             gaasClient.rest_getProjectList({}, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 var projs = arrayToHash(resp.projects, 'id');
//                 expect(projs).to.include.keys(projectId);
//                 expect(projs[projectId].targetLanguages).to.include('es');
//                 expect(projs[projectId].targetLanguages).to.include('qru');
//                 expect(projs[projectId].targetLanguages).to.not.include('de');
//                 expect(projs[projectId].targetLanguages).to.not.include('zh-Hans');
//                 expect(projs).to.include.keys(projectId2);
//                 expect(projs[projectId2].targetLanguages).to.include('de');
//                 expect(projs[projectId2].targetLanguages).to.include('zh-Hans');
//                 expect(projs[projectId2].targetLanguages).to.not.include('es');
//                 expect(projs[projectId2].targetLanguages).to.not.include('qru');
//                 if(CLEANSLATE) expect(resp.projects.length).to.equal(2);
//                 done();
//             });
//         });
//     });

//     describe('getProject(MyOtherProject)', function() {
//         it('should let us query our 2nd project', function(done) {
//             gaasClient.rest_getProject({ projectID: projectId2 }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 expect(resp.project.targetLanguages).to.include('de');
//                 expect(resp.project.targetLanguages).to.include('zh-Hans');
//                 expect(resp.project.targetLanguages).to.not.include('es');
//                 expect(resp.project.targetLanguages).to.not.include('qru');
//                 expect(resp.project.targetLanguages).to.not.include('it');
//                  done();
//             });
//         });
//     });

//     describe('updateProject(MyOtherProject) +it', function() {
//         it('should let us change the target languages', function(done) {
//             gaasClient.rest_updateProject({ projectID: projectId2, 
//                                  body: { newTargetLanguages: ["it"] }},
//                                function good(err, resp) {
//                                  if(err) { done(err); return; }
//                                    expect(resp.status).to.equal('success');
//                                    done();
//                                });
//             });
//     });

//     describe('getProject(MyOtherProject)', function() {
//         it('should let us query our 2nd project again', function(done) {
//             gaasClient.rest_getProject({ projectID: projectId2 }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 expect(resp.project.targetLanguages).to.include('de');
//                 expect(resp.project.targetLanguages).to.include('it');
//                 expect(resp.project.targetLanguages).to.include('zh-Hans');
//                 expect(resp.project.targetLanguages).to.not.include('es');
//                 expect(resp.project.targetLanguages).to.not.include('qru');
//                 done();
//             });
//         });
//     });

//     describe('deleteLangauge(MyOtherProject) -de', function() {
//         it('should let us delete German from 2nd project', function(done) {
//             gaasClient.rest_deleteLanguage({ projectID: projectId2, languageID: 'de' }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 done();
//             });
//         });
//     });

//     describe('getProject(MyOtherProject)', function() {
//         it('should let us query our 2nd project yet again', function(done) {
//             gaasClient.rest_getProject({ projectID: projectId2 }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 expect(resp.project.targetLanguages).to.not.include('de');
//                 expect(resp.project.targetLanguages).to.include('it');
//                 expect(resp.project.targetLanguages).to.include('zh-Hans');
//                 expect(resp.project.targetLanguages).to.not.include('es');
//                 expect(resp.project.targetLanguages).to.not.include('qru');
//                 done();
//             });
//         });
//     });

//     describe('updateProject(MyOtherProject) +de', function() {
//         it('should let us change the target languages', function(done) {
//             gaasClient.rest_updateProject({ projectID: projectId2, 
//                                  body: { newTargetLanguages: ["de"] }},
//                                function good(err, resp) {
//                                  if(err) { done(err); return; }
//                                    expect(resp.status).to.equal('success');
//                                    done();
//                                });
//             });
//     });

//     describe('getProject(MyOtherProject)', function() {
//         it('should let us query our 2nd project again again', function(done) {
//             gaasClient.rest_getProject({ projectID: projectId2 }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 expect(resp.project.targetLanguages).to.include('de');
//                 expect(resp.project.targetLanguages).to.include('it');
//                 expect(resp.project.targetLanguages).to.include('zh-Hans');
//                 expect(resp.project.targetLanguages).to.not.include('es');
//                 expect(resp.project.targetLanguages).to.not.include('qru');
//                 done();
//             });
//         });
//     });

//     describe('getProject(nonExist)', function() {
//         it('should NOT let us query a non-existent project', function(done) {
//             gaasClient.rest_getProject({ projectID: 'MyBadProject' }, function good(err, resp) {
//               if(err) { /* expected failure */ done(); return; }
//                 expect(resp.status).to.not.equal('success');
//                 done('Should not have worked');
//             });
//         });
//     });

//     describe('deleteProject', function() {
//         it('should let us delete', function(done) {
//             gaasClient.rest_deleteProject({ projectID: projectId2 }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 done();
//             });
//         });
//     });

//     describe('getProjectList', function() {
//         it('should return our project in the list', function(done) {
//             gaasClient.rest_getProjectList({}, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 if(CLEANSLATE) expect(resp.projects.length).to.equal(1);
//                 if(CLEANSLATE) expect(resp.projects[0].id).to.equal(projectId);
//                 var projs = arrayToHash(resp.projects, 'id');
//                 expect(projs).to.include.keys(projectId);
//                 done();
//             });
//         });
//     });

//     describe('getResourceData(en)', function() {
//         it('should return our resource data for English', function(done) {
//             gaasClient.rest_getResourceData({ projectID: projectId, languageID: 'en'}, function good(err, resp) {
//               if(err) { done(err); return; }
//               if(VERBOSE) console.dir(resp);
//                 expect(resp.status).to.equal('success');
//                 //expect(resp.resourceData.translationStatus).to.equal('sourceLanguage');
//                 expect(resp.resourceData.language).to.equal('en');
//                 done();
//             });
//         });
//     });

//     describe('getResourceEntry(en)', function() {
//         it('should return our resource data for English', function(done) {
//             gaasClient.rest_getResourceEntry({ projectID: projectId, languageID: 'en', resKey: 'key1'}, function good(err, resp) {
//               if(err) { done(err); return; }
//               if(VERBOSE) console.dir(resp);
//                 expect(resp.status).to.equal('success');
//                 expect(resp.resourceEntry.translationStatus).to.equal('sourceLanguage');
//                 expect(resp.resourceEntry.language).to.equal('en');
//                 expect(resp.resourceEntry.key).to.equal('key1');
//                 expect(resp.resourceEntry.value).to.equal(sourceData['key1']);
//                 done();
//             });
//         });
//     });

//     describe('getResourceData(fr)', function() {
//         it('should return our resource data for French', function(done) {
//             gaasClient.rest_getResourceData({ projectID: projectId, languageID: 'qru'}, function good(err, resp) {
//               if(err) { done(err); return; }
//               if(VERBOSE) console.dir(resp);
//                 expect(resp.status).to.equal('success');
// //                expect(resp.resourceData.translationStatus).to.equal('completed');
//                 expect(resp.resourceData.language).to.equal('qru');
//                 done();
//             });
//         });
//     });

//     describe('deleteProject', function() {
//         it('should let us deleted', function(done) {
//             gaasClient.rest_deleteProject({ projectID: projectId }, function good(err, resp) {
//               if(err) { done(err); return; }
//                 expect(resp.status).to.equal('success');
//                 done();
//             });
//         });
//     });

//     describe('getResourceData(en)', function() {
//         it('should NOT return our resource data for our deleted project', function(done) {
//             gaasClient.rest_getResourceData({ projectID: projectId, languageID: 'en'}, function good(err, resp) {
//               if(err) {
//                 if(err.obj) {
//                   if(VERBOSE) console.dir(err.obj);
//                 }
//                 done(); // failed, as expected
//                 return;
//               }
//               if(VERBOSE) console.dir(resp);
//                 expect(resp.status).to.not.equal('success');
//                 done();
//             });
//         });
//     });

//     describe('getProjectList', function() {
//         it('should return an smaller list again', function(done) {
//             gaasClient.rest_getProjectList({}, function good(err, resp) {
//               if(err) { done(err); return; }
//               expect(resp.status).to.equal('success');
//               if(CLEANSLATE) expect(resp.projects).to.be.empty();
//               var projs = arrayToHash(resp.projects, 'id');
//               expect(resp.projects).to.not.include.keys(projectId);
//               expect(resp.projects).to.not.include.keys(projectId2);
//               done();
//             });
//         });
//     });
// });