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

/* eslint no-console: "off" */

const crypto = require('crypto');
const url = require('url');
/**
 * @author Steven R. Loomis
 * @ignore
 */

var GaasHmac = function GaasHmac(name, user, secret) {
  this.name = name;
  this.secret = secret;
  this.user = user;
  if(!this.name || !this.user || !this.secret) {
    throw new Error('GaasHmac: params need to be "name,user,secret"');
  }
  this.secretBuffer = Buffer.alloc(this.secret.length, this.secret, this.ENC);
};

GaasHmac.prototype.name = null;
GaasHmac.prototype.user = undefined;
GaasHmac.prototype.secret = undefined;

GaasHmac.prototype.AUTH_SCHEME = "GaaS-HMAC";
// GaasHmac.prototype.AUTH_SCHEME = "GP-HMAC";
GaasHmac.prototype.SEP = "\n";
GaasHmac.prototype.ENC = "ascii"; // ISO-8859-1 not supported!
GaasHmac.prototype.HMAC_SHA1_ALGORITHM =  'sha1'; // "HmacSHA1";
GaasHmac.prototype.forceDate = null;
GaasHmac.prototype.forceDateString = null;

GaasHmac.prototype.VERBOSE = process.env.GP_VERBOSE || false;

function rfc1123date(d) {
  return d.toUTCString();
}

/**
 * ( from GaasHmac.java )
 *
 * Generate GaaS HMAC credentials used for HTTP Authorization header.
 * Gaas HMAC uses HMAC SHA1 algorithm signing a message composed by:
 *
 * (HTTP method):       (in UPPERCASE)
 * (Target URL):
 * (RFC1123 date):
 * (Request Body)
 *
 * If the request body is empty, it is simply omitted,
 * the 'message' then ends with the separator ":"
 *
 * The format for HTTP Authorization header is:
 *
 * "Authorization: GaaS-HMAC (user ID):(HMAC above)"
 *
 * For example, with user "MyUser" and secret "MySecret",
 * the URL "http://example.com/gaas",
 * the method "https",
 * the date "Mon, 30 Jun 2014 00:00:00 -0000",
 * the body "param=value",
 * the following text to be signed will be generated:
 *
 *  GET:http://example.com/gaas:Mon, 30 Jun 2014 00:00:00 -0000:param=value
 *
 * And the resulting headers are:
 *  Authorization: GaaS-HMAC MyUser:Y4qPpmKpyYhdAKA7p3U/y4nNDvY=
 *  Date: Mon, 30 Jun 2014 00:00:00 -0000
 *
 * The Date: header is required for HMAC.
 */
GaasHmac.prototype.apply = function(obj) {
  if(this.VERBOSE) console.dir(obj, {color: true, depth: null});
  if(obj.url.indexOf("/swagger.json") !== -1) return obj; // skip for swagger.json

  const href = url.parse(obj.url).href;
  if(href !== obj.url) {
    if(this.VERBOSE) console.log('hmac: Warn: normalized', obj.url, '->', href);
    // For example, if there is a quote (') in the URL, it will turn into %27
    // AFTER this interceptor is called (by Fetch).
    obj.url = href;
  }

  var dateString = (this.forceDateString ||
                    rfc1123date(this.forceDate || new Date()));
  var bodyString = "";
  if(obj.body) {
    if((typeof obj.body) === "string") {
      bodyString = obj.body;
    } else {
      bodyString = JSON.stringify(obj.body); // === what swagger does
    }
  }
  var hmacText = obj.method.toUpperCase() + this.SEP +
                 obj.url + this.SEP +
                 dateString + this.SEP +
                 bodyString;
  if(this.VERBOSE)  console.log('hmacText = <<' + hmacText + '>>');

  var hmacHash = crypto.createHmac(this.HMAC_SHA1_ALGORITHM, this.secretBuffer  )
    .update(hmacText, 'utf8')
    .digest('base64');
  if(this.VERBOSE)  console.log('hmacHash = ' + hmacHash );
  var hmacHeader = this.AUTH_SCHEME + ' ' + this.user + ':' + hmacHash;
  if(this.VERBOSE)  console.log('hmacHeader = ' + hmacHeader);
  obj.headers.Authorization = hmacHeader;
  obj.headers["GP-Date"] = dateString;
  return obj;
};

module.exports = GaasHmac;
