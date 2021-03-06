import { stringArg, subscriptionField } from '@nexus/schema';

import { withFilter } from 'apollo-server-express';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_UPDATED = 'USER_UPDATED';

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   nickname: string;
//   thumbURL: string;
//   photoURL: string;
//   birthday: string;
//   gender: string;
//   phone: string;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date;
// }

export const userSignedIn = subscriptionField('userSignedIn', {
  type: 'User',
  args: {
    userId: stringArg({ nullable: false }),
  },
  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx;
      return pubsub.asyncIterator(USER_SIGNED_IN);
    },
    (payload, { userId }) => payload.id === userId,
  ),
  resolve: (payload) => payload,
});

export const userUpdated = subscriptionField('userUpdated', {
  type: 'User',
  args: {
    userId: stringArg({ nullable: false }),
  },
  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx;
      return pubsub.asyncIterator(USER_UPDATED);
    },
    (payload, { userId }) => payload.id === userId,
  ),
  resolve: (payload) => payload,
});
