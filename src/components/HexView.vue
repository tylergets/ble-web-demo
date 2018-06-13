<template>
    <div>
        <div>
            <button @click="startDemo">Start Demo</button>
        </div>
        <div>
            <router-link to="data">Decoded View</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: "HexView",
    methods: {
      startDemo() {
        let JUMPER_SERVICE = "cdeacb80-5235-4c07-8846-93a37ee6b86d";
        let JUMPER_CHARACTERISTIC = "cdeacb81-5235-4c07-8846-93a37ee6b86d";

        navigator.bluetooth.requestDevice({ filters: [{ services: [JUMPER_SERVICE] }] })
        .then(device => device.gatt.connect())
        .then(server => {
          console.log('Connected to device');
          return server.getPrimaryService(JUMPER_SERVICE);
        })
        .then(service => service.getCharacteristic(JUMPER_CHARACTERISTIC))
        .then(characteristic => characteristic.startNotifications())
        .then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
          console.log('Notifications have been started.');
        })
        .catch(error => { console.log(error); });

        function handleCharacteristicValueChanged(event) {
          var value = event.target.value;
          console.log(value);
        }
      }
    }
  }
</script>

<style scoped>

</style>