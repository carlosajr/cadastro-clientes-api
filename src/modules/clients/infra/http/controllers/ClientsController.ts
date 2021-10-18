import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateClientService from "@modules/clients/services/CreateClientService";
import ListClientsService from "@modules/clients/services/ListClientsService";
import ShowClientService from "@modules/clients/services/ShowClientService";
import DeleteClientService from "@modules/clients/services/DeleteClientService";
import UpdateClientService from "@modules/clients/services/UpdateClientService";

class ClientsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createClientService = container.resolve(CreateClientService);

        const { name, gender, birthDate, city_id } = request.body;

        const client = await createClientService.execute({ name, gender, birthDate, city_id });

        return response.status(201).json(client);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const showClientService = container.resolve(ShowClientService);

        const { id } = request.params;

        const client = await showClientService.execute(id);

        return response.json(client);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listClientsService = container.resolve(ListClientsService);

        const dataSerach = request.body;

        const clients = await listClientsService.execute(dataSerach);

        return response.json(clients);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updateClientService = container.resolve(UpdateClientService);

        const { id } = request.params;
        const client = request.body;

        const updatedClient = await updateClientService.execute(id, client);

        return response.json(updatedClient);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteClientService = container.resolve(DeleteClientService);

        const { id } = request.params;

        await deleteClientService.execute(id);

        return response.status(202).json();
    }
}

export default new ClientsController();
