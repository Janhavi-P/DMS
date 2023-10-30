import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demo';
  
  constructor(private httpClient: HttpClient) { }
  selectedFile: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  //Gets called when the user selects an image
  
  //Gets called when the user clicks on submit to upload the image
  public onFileChanged(event: Event) {
    const target = event.target as HTMLInputElement | null;
    
    if (target) {
      this.selectedFile = target.files?.[0];
    }
  }
  
  onUpload() {
    console.log(this.selectedFile);
  
    // FormData API provides methods and properties to prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
  
    console.log(uploadImageData);
    // Make a call to the Spring Boot Application to save the image using the FormData object
    this.httpClient.post('http://localhost:8080/file/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Documemt uploaded successfully';
        } else {
          this.message = 'Document not uploaded successfully';
        }
      });
  }
  
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/file/download/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}