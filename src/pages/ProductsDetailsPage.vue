<template>
  <div class="product-detail">
    <h1>hey</h1>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';

// export default {
//   computed: {
//     ...mapState('store', ['products']), // Assuming your store module is named 'store'
//     product() {
//       // Assuming the product ID is passed as a route parameter
//       const productId = this.$route.params.id;

//       return this.products.find(product => product.id === parseInt(productId));
//     }
//   },
//   data() {
//     return {
//       showUpdateModal: false
//     };
//   },
// }
//   methods: {
//     ...mapActions('store', ['updateProduct', 'deleteProduct']),
//     updateProduct() {
//       const updatedProductData = {
//         title: 'New Title', // Update with your form data
//         // Add other fields as needed
//       };

//       // Simulate a PUT/PATCH request to the server
//       this.updateProduct({ id: this.product.id, updatedProduct: updatedProductData })
//         .then(() => {
//           // Update the product in the store (assuming the mutation is correctly implemented)
//           this.$store.commit('store/setProduct', updatedProductData);
//           // Hide the update modal
//           this.showUpdateModal = false;
//         })
//         .catch(error => {
//           console.error('Error updating product:', error);
//         });
//     },
//     deleteProduct() {
//       // Simulate a DELETE request to the server
//       this.deleteProduct(this.product.id)
//         .then(() => {
//           // Remove the product from the store
//           this.$store.commit('store/removeProduct', this.product.id);
//           // Redirect to the home page
//           this.$router.push('/');
//         })
//         .catch(error => {
//           console.error('Error deleting product:', error);
//         });
//     }
//   }
// };
</script>
