# Media Devices: Audio and Video

## Register Media Devices

```js
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(stream => {
    // do something with the stream

});
```

## Stop Media Recording

```js

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(stream => {
    stream.getTracks().forEach(track => track.stop());
});
```
