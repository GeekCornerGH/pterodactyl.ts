import { RawPanelEggList } from "../types/application/panelEgg";
import { PanelNestAttributes, RawPanelNest } from "../types/application/panelNest";
import { RawServerList } from "../types/application/server";
import { ApplicationClient } from "./ApplicationClient";
import { Egg } from "./Egg";
import { Server } from "./Server";

var client: ApplicationClient
export class Nest implements PanelNestAttributes {
    readonly id: number;
    readonly uuid: string;
    readonly author: string;
    name: string;
    description?: string | null;
    readonly created_at: string | Date;
    updated_at: string | Date;
    private readonly rawRelationships?: { 
        readonly eggs?: RawPanelEggList; 
        readonly servers?: RawServerList; 
    };
    readonly associatedEggs?: Array<Egg>;
    readonly associatedServers?: Array<Server>;

    constructor(applicationClient: ApplicationClient, nestProps: RawPanelNest) {
        this.id = nestProps.attributes.id;
        this.uuid = nestProps.attributes.uuid;
        this.author = nestProps.attributes.author;
        this.name = nestProps.attributes.name;
        this.description = nestProps.attributes.description;
        this.created_at = new Date(nestProps.attributes.created_at);
        this.updated_at = new Date(nestProps.attributes.updated_at);
        this.rawRelationships = nestProps.attributes.relationships;
        if (this.rawRelationships?.eggs) this.associatedEggs = this.rawRelationships.eggs.data.map(eggProps => new Egg(applicationClient, eggProps));
        if (this.rawRelationships?.servers) this.associatedServers = this.rawRelationships.servers.data.map(serverProps => new Server(applicationClient, serverProps));
        client = applicationClient;
    }

    // TODO: Add methods 

}