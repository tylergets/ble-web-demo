<template>
    <div>
        <h1>o2: {{o2}}</h1>
        <h1>bpm: {{bpm}}</h1>
        <h1>pi: {{pi}}</h1>
        <button @click="startDemo">Start Demo</button>
    </div>
</template>

<script>
  export default {
    name: "PlainView",
    data() {
      return {
        o2: 0,
        bpm: 0,
        pi: 0
      }
    },
    methods: {
      startDemo() {
        this.o2 = 123;
        let JUMPER_SERVICE = "cdeacb80-5235-4c07-8846-93a37ee6b86d";
        let JUMPER_CHARACTERISTIC = "cdeacb81-5235-4c07-8846-93a37ee6b86d";

        navigator.bluetooth.requestDevice({filters: [{services: [JUMPER_SERVICE]}]})
        .then(device => device.gatt.connect())
        .then(server => {
          console.log('Connected to device');
          return server.getPrimaryService(JUMPER_SERVICE);
        })
        .then(service => service.getCharacteristic(JUMPER_CHARACTERISTIC))
        .then(characteristic => characteristic.startNotifications())
        .then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', (event) => {
            var value = event.target.value;
            console.log(buf2hex(value.buffer));
            if (value.getUint8(0) == '129') {
              this.bpm = value.getUint8(1);
              this.o2 = value.getUint8(2);
              this.pi = value.getUint8(3) / 10;
              console.log(this.bpm + ' ' + this.o2 + ' ' + this.pi);
            }
          });
          console.log('Notifications have been started.');
        })
        .catch(error => {
          console.log(error);
        });

        function buf2hex(buffer) { // buffer is an ArrayBuffer
          return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
        }
      }
    }
  }
</script>

<style scoped>

</style>