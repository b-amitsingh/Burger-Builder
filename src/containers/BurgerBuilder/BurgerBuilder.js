import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary' 

const INGREDIENT_PRICE = {
    salad: 30,
    cheese: 30,
    meat: 60,
    bacon: 40
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 100,
        purchasable: false,
        purchasing: false
    }

    updatedPurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((sum, el) => sum + el ,0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotalPrice});
        this.updatedPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0)
            return;
        const newCount = oldCount - 1
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotalPrice});
        this.updatedPurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = () => {
        alert("you decided to continue!!")
    }



    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    purchaseCancelled={this.purchaseCancelHandler} 
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice} />
                </Modal>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;