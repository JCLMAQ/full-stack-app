import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.configParam.createMany({
    data: [
      {
      name: 'EMAIL_DELAY_BTW_ENABLE',
      value: '1',
      utility: 'Activate limitation of asking email repeatedly.'
      },
      {
        name: 'EMAIL_DELAY_BTW',
        value: '10m',
        utility: 'Delay between two email sending'
      },
      {
        name: 'APP_EMAIL_LIMIT_DOMAIN',
        value: '1',
        utility: 'Email domain limitation (domains listed in the DB)'
      },
      {
        name: 'ORG_LIMIT_DOMAIN',
        value: '1',
        utility: 'Email domain limitation for the Organization (domains listed in the DB)'
      },
      {
        name: 'ORG_LIMIT_EXTENSION',
        value: '1',
        utility: 'Email domain extension limitation (extensions listed in the DB)'
      },
      {
        name: 'ACCOUNT_VALIDATION_EMAIL',
        value: '1',
        utility: 'Email addresse verification with new register or account change email.'
      },
      {
        name: 'AUTO_REGISTRATION_ENABLE',
        value: '0',
        utility: 'Allow autoregistration - juste need to enter an email, no need of a validation by an ADMIN of the Organization or of the App'
      },
      {
        name: 'REGISTRATION_VALIDATION',
        value: '0',
        utility: 'User Registration need to be validated before sign in'
      },

      {
        name: 'PWDLESS_LOGIN_ENABLE',
        value: '0',
        utility: 'Password less login enable with email link for logging.'
      },

      {
        name: 'EMAIL_HOST',
        value: 'localhost',
        utility: 'Email host domain (the one which send the email from the app).'
      },
      {
        name: 'EMAIL_PORT',
        value: '1025',
        utility: 'Email host port.'
      },
      {
        name: 'EMAIL_NOREPLY',
        value: 'project.1@$localhost',
        utility: 'No-reply email address.'
      },
      {
        name: 'EMAIL_NOREPLY_USER',
        value: 'project.1',
        utility: 'No-reply user.'
      },
      {
        name: 'EMAIL_APP_ADMIN',
        value: 'jcl.maquinay@gmail.com',
        utility: 'Email to reach the application administrator.'
      },
      {
        name: 'EMAIL_NOREPLY_PWD',
        value: 'secret.1',
        utility: 'No-reply email password.'
      },
      {
        name: 'EMAIL_TOKEN_EXPIRATION',
        value: '10m',
        utility: 'Expiration delay for the email token.'
      },
      {
        name: 'FORGOTPWD_TOKEN_EXPIRATION',
        value: '10m',
        utility: 'Expiration delay for the forgot paswword token.'
      },
      {
        name: 'ACCOUNT_VALIDATION_TOKEN_EXPIRATION',
        value: '10m',
        utility: 'Expiration delay for the account validation token.'
      },
      {
        name: 'JWT_LOGOUT_ENABLE',
        value: '1',
        utility: 'Enable JWT cancelation when logout (! nedd an access to the DB each time, JWT is send to the backend).'
      },
      {
        name: 'JWT_VALIDITY_DURATION',
        value: '10m',
        utility: 'Validity duration of the JWT token.'
      },
      {
        name: 'FILES_STORAGE_DEST',
        value: './uploadedfiles',
        utility: '! Not used for now - URL for the files storage location.'
      },
      {
        name: 'IMAGES_STORAGE_DEST',
        value: './uploadedimages',
        utility: " ! Not used for now - URL for the files storage location."
      },
      {
        name: 'IMAGES_TEMP_STORAGE_DEST',
        value: './uploadedtempimages',
        utility: " ! Not used for now - URL for the files storage location."
      }
    ]
  })
  await prisma.appEmailDomain.createMany({
    data:[ {
      domain: 'test.be',
      allowed: true
      },
      {
        domain: 'gmail.com',
        allowed: true
      },
      {
        domain: 'outlook.be',
        allowed: false
      }
    ]
  })
}
main().catch(e => {
    console.log(e);
    process.exit(1);
  }).finally(async () => {
    await  prisma.$disconnect()
})

