import { container } from "tsyringe";

import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import BCryptHashProvider from "@modules/users/infra/providers/HashProvider/BCryptHashProvider";

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
