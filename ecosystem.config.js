module.exports = {
  apps : [{
    name: 'express-o',
    script: './bin/www',
    node_args: "--env-file ./.env.dev",
    instances: '2',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development'
    }
  }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};

// npm i pm2 -g
  // pm2 init
  // pm2 start // 1 instance per core
  // pm2 kill
  // pm2 log
  // 0 0 * * * /usr/bin/certbot renew --webroot -w /somewhere-cert --deploy-hook "pm2 reload all" // to check renew reload certs
