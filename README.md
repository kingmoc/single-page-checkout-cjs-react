# Listing Products in a Catalog using Commerce.js (SDK) and React.js

A quick guide that shows you how to display a list of products using React.js & Commerece.js (SDK)
*Note: This guide is using v2*

![](src/img/home-screen-shot.JPG)

## Overview
The point of this guide is to help developers get familiar with using the Commerce.js SDK in conjunction with React.  Commerce.js is a powerful tool/resource that allows you the ability to build custom ecommerce sites without the headache building out a lot of the complex functionality that comes along with ecommerce.  This means less experienced developers or eager online entrepreneurs can use these tools and build a more controlled and customized online store without relying on the big players like Shopify. Let's dive in! 

#### This guide will cover: 

1. Adding Products to your chec dashboard
2. Using the Commerce.js SDK to access dashboard data
3. Implementing Commerce.js in a React App
4. Displaying a list of products on the screen

*This guide will not go into detail about other features/functionality within an eccomerce site such as: adding to cart, product page, checking out etc ... It will simply give a blueprint to how you can display a list of products specifically with React.* 

### Requirements/Prerequisites

- [ ] IDE of your choice (code editor)
- [ ] [NodeJS](https://nodejs.org/en/), or [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [ ] Some knowledge of Javascript & React
- [ ] *Bonus* familiarity with the framework Semantic UI

## Getting Started

### STEP 1. Create an account and upload Product Info:

It should be noted that there are two main components, chec (dashboard) and commerce.js SDK.  Think of chec as the power, the source of all your customer data, transactions - things of that nature.  Think of the SDK as your way to communicate with your data.  You'll need to create an account [HERE](https://dashboard.chec.io/signup) - once logged in navigate to products! The only product data you need to get started is: **Name, Image, Price, Descrption.** 
