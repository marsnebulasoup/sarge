import { Results } from "../formatter";
const fs = require('fs')
const vision = require('@google-cloud/vision');
const { GoogleAuth, grpc } = require('google-gax');


export class Processer {
  // ↓ these are field declarations, which basically just make the class's fields clearer...typescript requires them though: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#field_declarations
  url: string;
  #client: any; // # makes it a private field
  constructor(url: string) {
    this.url = url; // image url

    const sslCreds = this.#getApiKeyCredentials()
    this.#client = new vision.ImageAnnotatorClient({ sslCreds });
  }


  #getApiKeyCredentials() {
    const sslCreds = grpc.credentials.createSsl();
    const googleAuth = new GoogleAuth();
    const authClient = googleAuth.fromAPIKey(process.env.GCP_VISION_API_KEY);
    const credentials = grpc.credentials.combineChannelCredentials(
      sslCreds,
      grpc.credentials.createFromGoogleCredential(authClient)
    );
    return credentials;
  }

  // initialize the client


  getText() { // infallible 😁
    return new Promise<Results>(resolve => {
      // resolve(JSON.parse(fs.readFileSync(__dirname + "\\example.json")))
      this.#client.textDetection(this.url).then(result => {
        try {
          const results: Results = result[0]
          if (results.error) {
            console.log('There was an error in (try block) ./processer/index.ts ↓');
            console.error(results.error.message);
          }
          resolve(results)
        }
        catch (error) {
          console.log('There was an error in (1st catch) ./processer/index.ts ↓');
          console.error(error);
          resolve({
            textAnnotations: []
          })
        }
      }).catch(error => {
        console.log('There was an error in (2nd catch) ./processer/index.ts ↓');
        console.error(error);
        resolve({
          textAnnotations: [],
        })
      })
    })

  }

}