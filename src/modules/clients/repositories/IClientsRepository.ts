import ICreateClientDto from "../dtos/ICreateClientDto";
import IFindClientsDto from "../dtos/IFindClientsDto";
import Client from "../infra/typeorm/entities/Client";

export default interface IClientsRepository {
  create(data: ICreateClientDto): Promise<Client>;
  list(dataSerach: IFindClientsDto): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  update(client: Client): Promise<Client>;
  delete(client: Client): Promise<void>;
}
