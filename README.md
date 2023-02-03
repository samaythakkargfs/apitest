# APITEST

The repo contains the tests to test timestamp converter

## Steps to run the tests

1. Install Nodejs
2. Run below command to install the dependencies
```
npm install
```
3. Run the below commmand to run the test
```
npm test
```

Report can be found in file named test-report.html

### Please Node: IF the tests are failing, then it  might be 503 due to load on application or 429 error due to max requests reached

### Suggestions

1. The application should be capable of taking high load of users. Currenly getting 503 error if there are many requests simultaneously.

2. When a wrong parameter is passed, it should give proper error message and status code in response

3. Endpoints should be different for timestamp to date and date to timestamp conversion

4. Load testing should be performed

5. If the string is passed in parameter, it should not process it. Strings can contain injections


