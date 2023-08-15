import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  AnyAbility,
  AnyMongoAbility,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import {
  DEFAULT_ACTION,
  DEFAULT_SUBJECT,
  IGroupPolicies,
  IPolicies,
  IRules,
  IUserLogin,
} from '../../auth/login/interface';
import { useDispatch } from 'react-redux';
import { setRules } from '../../auth/login/login.slice';

interface Todo {
  type: 'Todo';
  id: number;
  title: string;
  assignee: string;
  completed: boolean;
}

type Actions = DEFAULT_ACTION;
type Subjects = DEFAULT_SUBJECT;

export type AppAbility = MongoAbility<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AnyMongoAbility>;

export default function defineRulesFor(userPolicies: IGroupPolicies[]) {
  const { can, rules, cannot } = new AbilityBuilder(createMongoAbility);
  const dispatch = useDispatch();
  const tempArray: IRules[] = [];
  if (!userPolicies?.length) {
    can('manage', 'all');
  } else {
    userPolicies?.forEach((groupPolicy) => {
      groupPolicy?.policies.forEach((policyItem) => {
        can(policyItem?.action, `${policyItem?.resource}`);
        if (
          tempArray?.find((arrayItem) => arrayItem.id === policyItem.id) === undefined
        ) {
          tempArray.push({
            id: policyItem?.id,
            action: policyItem?.action,
            resource: policyItem?.resource,
            name: policyItem?.name,
            actionAbility: policyItem?.actionAbility,
          });
        }
      });
    });
  }

  dispatch(setRules(tempArray));
  return rules;
}

export function buildAbilityFor(userPolicies: IGroupPolicies[]): AnyMongoAbility {
  return new AppAbility(defineRulesFor(userPolicies), {
    detectSubjectType: (object) => object!.type,
  });
}
