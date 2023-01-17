<template>
  <div class="container">
    <CBox

      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
    >
      <CHeading text-align="center" mb="4">{{snapshotValue}} </CHeading>
      <CFlex justify="center" direction="column" align="center" >
        <CBox mb="3" display="flex" justify-content="center" flex-direction="column">
          <CInput placeholder="Your input..." type="text" v-model="inputValue"/>
          <CButton left-icon="info" variant-color="blue" @click="doSubmit" mt="2">
            Submit
          </CButton>
        </CBox>
                
      </CFlex>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading,
  CInput
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading
  },
  data () {
    return {
      snapshotValue: 'Hello chakra-ui/vue',
      inputValue: ''
    }
  },
  methods: {
    async doSubmit  () {
      try {
       const result = await this.$axios.$post(`http://127.0.0.1:5001/db-circle-b3982/us-central1/saveInputText`, { text: this.inputValue })
      
        this.$toast({
          description: result,
          status: 'success',
          duration: 10000,
          isClosable: true
        })
      }catch(e){
        this.$toast({
          description: "Oops something went wrong, please try again later.",
          status: 'error',
          duration: 10000,
          isClosable: true
        })
      }
     
    }
  }, 
  mounted() {
    const dataRef = this.$fire.firestore.collection('Texts').doc('inputfield')
    dataRef.onSnapshot(docSnapshot => {
      // Get the data from the snapshot
      const data = docSnapshot.data();
      this.snapshotValue = data.text
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
  }
}
</script>
