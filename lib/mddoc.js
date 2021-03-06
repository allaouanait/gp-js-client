/*
 * Copyright © IBM Corp. 2015-2018
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

const utils = require('./utils');

/**
 * Markdown Document
 */
class MarkdownDocument {
  /**
   * Normally this c'tor is not called directly, but client.MarkdownDocument() is used.
   * @param {Object} opts - options
   * @param {Client} gp - backpointer to the client object
   */
  constructor (opts, gp) {
    utils._initSubObject(this, gp, opts);
    this.type = "MD";
  }

  /**
   * Delete this document.
   * @returns {Promise}
   */
  delete() {
    return this.gp.restCall('document.deleteDocument', { serviceInstanceId: this.serviceInstanceId, type: this.type, documentId: this.id });
  }

  /**
   * Fetch the document’s data from the server.
   * @returns {Promise<MarkdownDocument>} The updated document data
   */
  async getInfo() {
    const {documentData} = await this.gp.restCall('document.getDocumentData',
      {
        serviceInstanceId: this.serviceInstanceId,
        type: this.type,
        documentId: this.documentId
      });
    documentData.id = this.documentId;
    return this.gp.MarkdownDocument(documentData);
  }

  /**
   * Update the document’s configuration.
   * @param {Object} opts - values to update
   * @returns {Promise}
   */
  update(body) {
    return this.gp.restCall('document.updateDocument',
      {
        serviceInstanceId: this.serviceInstanceId,
        type: this.type,
        documentId: this.documentId,
        body
      });
  }

  /**
   * Download document
   * @param {String|Object} opts (if String, treated as languageId)
   * @param {String} opts.languageId language to download
   * @returns {Promise<string>} the document content
   */
  download(opts) {
    if (typeof opts === 'string') {
      opts = {languageId: opts};
    }
    const serviceInstanceId = opts.serviceInstanceId || this.serviceInstanceId;
    const { languageId } = opts;
    const documentId = opts.documentId || this.documentId;
    return this.gp.swaggerClient.then((client) =>
      client.apis.document.getDocumentContent({
        serviceInstanceId,
        type: this.type,
        documentId,
        languageId
      }))
      .then((resp) => {
        if(resp.status !== 200) throw Error(`${resp.status}: ${resp.statusText}`);
        return resp.data;
      });
  }

  /**
   * Create a new Markdown document on the server
   * @param {Object} body
   * @returns {Promise}
   */
  create(body) {
    return this.gp.restCall('document.createDocument',
      {
        serviceInstanceId: this.serviceInstanceId,
        type: this.type,
        documentId: this.documentId,
        body: body
      });
  }

  /**
   * Upload a Markdown document’s content
   * @param {String} opts.languageId - language ID to upload.
   * @param {String} opts.body - Updated content
   * @returns {Promise}
   */
  upload(opts) {
    const { languageId, body } = opts;
    return this.gp.restCall('document.uploadDocument', {
      serviceInstanceId: this.serviceInstanceId,
      type: this.type,
      documentId: this.documentId,
      languageId,
      body
    });
  }

  /**
   * Gets the service instance ID
   */
  get serviceInstanceId() {
    return this.gp._options.serviceInstance;
  }

  /**
   * Get the document’s identifier
   */
  get documentId() {
    return this.id;
  }

  /**
   * Set the document’s identifier
   */
  set documentId(id) {
    this.id = id;
  }
}

module.exports = MarkdownDocument
