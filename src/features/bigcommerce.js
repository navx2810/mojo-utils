import axios from 'axios';

const api = axios.create({
	baseURL: '/api/storefront/cart'
});

export default new (class {
	async readCart() {
		const res = await api.get(null, {
			params: {
				include: [
					'lineItems.digitalItems.options',
					'lineItems.physicalItems.options'
				]
			}
		});
		return res.data;
    }
    
    async addItem(productId, quantity = 1) {
        const cart = await this.readCart();
        if(cart.id) {
            const res = await api.post(cart.id)
            return res.data
        }
    }
})();
