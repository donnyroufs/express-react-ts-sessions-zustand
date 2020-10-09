import { Response, Request, NextFunction } from "express";
import query from "./queryData";

const users = query("users");


class Auth {
  public static isAuthorized(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
      next();
    } else {
      res.sendStatus(403);
    }
  }

  public static authenticateUser({ username, password }: User) {
    const foundUser = users.find((u: User) => u.username === username);
    if (foundUser && foundUser.password === password) {
      return {
        isValid: true,
        user: {
          id: foundUser.id,
          username,
        },
      };
    }
    return {
      isValid: false,
      user: null,
    };
  }

  public static isAuthenticated(req: Request, res: Response) {
    if (req.session.user) {
      return res.status(200).json(req.session.user);
    }
    res.status(403).json({});
  }
}

export default Auth;
