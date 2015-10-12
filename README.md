# G-sheetz

A node api powered by Google Sheets

### get started

```shell
npm i 
npm run start # Run in Development mode
```

### run tests
```shell
npm run test
```

### api

- GET `/`
- POST `/api/store`
```
# required fields
headers: {
  username: required,
  password: required
},
form: {
  [fields]
}
```
- GET `/api/store`

### environments

In order to get this project up and running fill out your enviroment file in `etc/.env.js`

To grab `sheet, private_key_id, private_key, client_email, client_id` you'll need to follow the steps below:

##### Setup Instructions

- Go to the Google Developers Console
- Select your project or create a new one (and then select it)
- Enable the Drive API for your project
- In the sidebar on the left, expand APIs & auth > APIs
- Search for "drive"
- Click on "Drive API"
- click the blue "Enable API" button
- Create a service account for your project
- In the sidebar on the left, expand APIs & auth > Credentials
- Click "Create new Client ID" button
- select the "Service account" option
- click "Create Client ID" button to continue
- when the dialog appears click "Okay, got it"
- your JSON key file is generated and downloaded to your machine (it is the only copy!)
- note your service account's email address (also available in the JSON key file)
- Share the doc (or docs) with your service account using the email noted above

### google-spreadsheet

This project uses [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet)

=

built with ♥ by [@clintonhalpin](http://twitter.com/clintonhalpin)
