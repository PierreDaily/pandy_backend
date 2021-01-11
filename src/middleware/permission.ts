import type { RequestHandler } from "express";

import { Ability, AbilityBuilder } from "@casl/ability";

import { ROLE } from "../constants";

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User {
      id: string;
      role: string;
    }
  }
}

type Action = "create" | "read" | "update" | "delete";
type Subject = "User";

export default function defineAbilityFor(user: Express.User | undefined) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (user?.role) {
    case ROLE.USER:
      cannot("create", "User");
      break;

    case ROLE.ADMIN:
      can("create", "User");
      break;

    default:
      cannot("create", "User");
      break;
  }

  return build();
}

function permissionMiddleware(action: Action, entity: Subject): RequestHandler {
  return (req, res, next) => {
    const ability = defineAbilityFor(req.user);
    const hasAuthorisation = ability.can(action, entity);
    if (hasAuthorisation) {
      next();
    } else {
      res.status(403).send({ error: { message: "Access denied" } });
    }
  };
}

export { permissionMiddleware };
