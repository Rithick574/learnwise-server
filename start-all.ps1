pnpm concurrently "pnpm --prefix auth-service run start:dev" `
                  "pnpm --prefix gateway-dev run start:dev" `
                  "pnpm --prefix notification-service run start:dev" `
                  "npm --prefix user-service run start:dev" `
                  "pnpm --prefix course-service run start:dev" `
                  "pnpm --prefix payment-service run start:dev"
