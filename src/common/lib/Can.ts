import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility } from './ability';
import { AnyAbility, AnyMongoAbility } from '@casl/ability';

export const AbilityContext = createContext<AnyMongoAbility>(undefined!);

export default createContextualCan(AbilityContext.Consumer);
