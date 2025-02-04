# Sauce Demo Automation Test Suite

![WebdriverIO](https://img.shields.io/badge/WebdriverIO-v8-blue)
![Allure Report](https://img.shields.io/badge/Allure%20Report-v2-green)

Automation test suite for [Sauce Demo](https://www.saucedemo.com/) e-commerce demo website. This repository contains test scenarios implemented using WebdriverIO and JavaScript.

## Features

- Three independent test scenarios
- Allure test reporting with screenshots
- Headless Chrome execution
- Separate test execution capability
- Automatic app state reset
- Cross-browser ready configuration

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- Chrome browser (latest)

## Installation

1. Clone the repository:
git clone https://github.com/<your-username>/saucedemo-automation.git
cd saucedemo-automation

## Install dependencies:
npm install

## Test Scenarios

Q1 Part 1: Locked User Validation
Test login with locked_out_user

Verify error message display

Q1 Part 2: Standard User Flow
Full purchase journey with standard_user

Cart management verification

Price calculation validation

Q2: Performance User Flow
Purchase flow with performance_glitch_user

Z-A sorting verification

Single item checkout validation

## Running Tests

## Run all tests:

npm test


## Run specific tests:

npm run test:q1p1  # Q1 Part 1
npm run test:q1p2  # Q1 Part 2
npm run test:q2    # Q2


## Generate Allure Report:

npm run test:report

## Viewing Reports

npm run report:open
