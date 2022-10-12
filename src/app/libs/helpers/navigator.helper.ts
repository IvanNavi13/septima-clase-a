
export default class NavigatorHelper{
    
    
    // static getLocation(): Promise<any>{
    //     navigator.geolocation.getCurrentPosition(posi =>{
    //         // resolve()
    //     })
    // }

    // static async getLocation(){
    //     // let posicion: any = {
    //     //   timeout: 0,
    //     // }
    
    //     navigator.geolocation.getCurrentPosition( (pos) => {
    //     //   console.log("Resp: ",pos);
    //         Promise.resolve(pos);
    //     },
    //     (error) => {
    //         Promise.reject(error);
    //     //   console.log(error);
    //     } 
    //     )
    //   }

    static getLocation(): Promise <any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition( (pos) => {
                resolve(pos);
            },
            (error) => {
                reject(error)
            })
        })
    }


    static getLocationCa(success:(key : any) => void, error:(key : any) => void): void{
        navigator.geolocation.getCurrentPosition((posi) =>{
            success(posi)
        },
        (err) => {
            error(err)
        })
    }


    static startRecord(elemVideo: HTMLVideoElement, btn: HTMLElement){
        navigator.mediaDevices.getUserMedia({
            video:{
                width: 800,
                height: 600,
                deviceId: {
                    exact: "17a26b8ddf5186fbcef559cc03cc20016d1f6624ccbd1191454df2ab4b18d2b6"
                }
            },
            audio: true
        }).then(media => {
            console.log(media)
            elemVideo.srcObject = media
            // elemVideo.onloadedmetadata = (resp) =>{elemVideo.play()}
            elemVideo.onloadedmetadata = (resp) => {
                elemVideo.play()
                let data :any[] = [];
                
                const record = new MediaRecorder( media, {mimeType: 'video/webm'})
                
                record.ondataavailable = (event) =>{data.push(event.data)}
                
                console.log("ondataavailable"); 
                
                record.onstop = () => { 
                    console.log("onstop"); 
                    const blob = new Blob(data, {type:'video/webm'} )

                    // const reader = new FileReader()
                    // reader.readAsDataURL(blob);
                    // reader.onloadend = () => {
                    //     console.log("Reader", reader.result)
                    // }
                    const url = URL.createObjectURL(blob);
                    const varA = document.createElement("a");
                    document.body.appendChild(varA);
                    varA.href = url
                    varA.download = "video.webm"
                    varA.click()
                    console.log(URL.createObjectURL(blob));
                }

                setTimeout( () => {
                    console.log("ToStart")
                    record.start()
                },10)

                btn.addEventListener('click', () =>{
                    console.log("ToStop")
                    record.stop()
                })
                // setTimeout( () => {
                // }, 2000)
                
            }
        })
    }

    static getDevices(){
        navigator.mediaDevices.enumerateDevices().then((resp) =>{
            resp.forEach((item) =>{
                if(item.kind === "videoinput")
                    console.log(item);
            })
        })
    }

    static startAudio(audio: HTMLAudioElement, btn: HTMLElement){
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((audioMedia) =>{
            audio.srcObject = audioMedia;
            audio.onloadedmetadata = (resp) => { 
                audio.play();
                let data :any[] = []; 
                const record = new MediaRecorder( audioMedia, {mimeType: 'audio/webm'})
                record.ondataavailable = (event) =>{
                    data.push(event.data)
                }
                record.onstop = () => { 
                    const blob = new Blob(data, {type:'audio/webm'} )
                    const url = URL.createObjectURL(blob);
                    const varA = document.createElement("a");
                    document.body.appendChild(varA);
                    varA.href = url
                    varA.download = "audio.webm"
                    varA.click()
                    console.log(URL.createObjectURL(blob));
                }

                setTimeout( () => {
                    console.log("ToStart")
                    record.start()
                },10)

                btn.addEventListener('click', () =>{
                    console.log("ToStop")
                    record.stop()
                })
                
            }
            
        })
    }

} 
