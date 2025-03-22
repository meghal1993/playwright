# Playwright Automation Framework

## 1. Overview
This Playwright framework is built using **Test and TypeScript**, ensuring robust and scalable automation testing.

---

## 2. Core Framework Structure

### **2.1 Page Object Model (POM) Implementation**
The framework follows the **POM design pattern**, improving code maintainability and reusability by separating test logic from page interactions.

### **2.2 Environment Files**
Environment-specific configuration files allow testing in **multiple environments (e.g., QA, Staging, Production)** without modifying test scripts.

---

## 3. Test Execution & Configuration

### **3.1 Run Test Cases Based on Tag**
Test cases are categorized using **tags (e.g., Smoke, Regression)**, enabling selective test execution.

### **3.2 Execute Test Cases in Parallel / Serial Mode**
Tests can be executed **in parallel for faster execution** or in **serial mode** when required.

### **3.3 Data-Driven Testing**
Supports **parameterized tests** using external data sources to **enhance test coverage**.

### **3.4 Skip Login for Test Cases**
Authentication state is stored, allowing **tests to bypass login**, reducing execution time.

---

## 4. Automation Enhancements & Customization

### **4.1 Global Setup File**
A global setup file **automates cleanup tasks** like deleting Allure reports, logs, and handling authentication state before execution.

### **4.2 Create Scripts**
Custom **npm scripts** are added in `package.json` for simplified test execution and automation workflows.

---

## 5. Debugging & Reporting

### **5.1 Log Files Setup**
Logs are generated during test execution, allowing users to **debug and analyze test results efficiently**.

### **5.2 Test Reporting**
The framework includes **Allure reporting**, providing detailed and interactive test execution reports.

---

## 6. Code Quality & Security

### **6.1 ESLint Configuration**
ESLint is integrated to **enforce coding standards**, improve code consistency, and prevent errors in TypeScript files.

### **6.2 Encryption & Decryption of Username and Password**
Sensitive credentials are **securely encrypted and decrypted**, ensuring data protection and security compliance.

---

## 7. Folder Structure
```
📂 project-root  
 ┣ 📂 allure-results/                  # Allure reports output
 ┣ 📂 allure-results/                  # Processed Allure reports output  
 ┣ 📂 src/                            
    ┣ 📂 auth/                         # Authentication files  
    ┣ 📂 config/                       # Environment configuration files  
    ┣ 📂 logging/                      # Log files (Error, Info)  
    ┣ 📂 pages/                        # Page Object Model (POM) files  
    ┣ 📂 testData/                     # Test data  
    ┣ 📂 tests/                        # Test scripts  
    ┣ 📂 utils/                        # Utility files  
 ┣ 📜 eslint.config.mjs                # ES Lint file
 ┣ 📜 global-setup.ts                  # Global setup file
 ┣ 📜 package.json                     # npm scripts and dependencies  
 ┣ 📜 playwright.config.ts             # Playwright configuration  
 ┣ 📜 readme.md                        # Project documentation  
 ┗ 📜 tsconfig.json                    # Typescript setup file
```

---

## Conclusion
This Playwright framework ensures **scalability, efficiency, and security** while simplifying test automation. It provides a structured, maintainable, and powerful testing solution for web applications.

