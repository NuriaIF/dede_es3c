import { Request, Response } from 'express';
import { UserService } from '../services/User_Service';
import { User } from '../entities/User';
import { DeleteResult } from 'typeorm';
import * as crypto from 'crypto';
import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
  } from "@inrupt/solid-client";
  
import { VCARD } from "@inrupt/vocab-common-rdf";
import { AddressFields } from '../entities/Address';


export class UserController {

    /**
     * Get all users
     * @param req Request
     * @param res Response
     * @returns All users with status 200 or error 500
     */
    public async getUsers(req: Request, res: Response) {
        try {
            res.status(200).json(await UserService.getUsers(req.app));
        } catch (error) {
            res.status(500).json({ error: "Error on get all users" });
        }
    }

    /**
     * Get user by id
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(req.app, String(req.params.id));
            user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get user by id" })
        }
    }

    /**
     * Get user by username
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async getUserByUsername(req: Request, res: Response) {
        try {
            const user = await UserService.getUserByUsername(req.app, req.params.username);
            user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get user by username: " + error })
        }
    }

    /**
     * Update user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async updateUser(req: Request, res: Response) {
        try {
            let salt = crypto.randomBytes(16).toString("hex");
            let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
            let userBody = new User(req.body.username, req.body.email,salt, hash, req.body.rol );
            const user = await UserService.updateUser(req.app, String(req.params.id), userBody);
            user ? res.status(200).json(user.raw) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on update user: " + error })
        }
    }

    /**
     * Delete user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async deleteUser(req: Request, res: Response) {
        try {
            const user: DeleteResult = await UserService.deleteUser(req.app, String(req.params.id));
            user ? res.status(200).json(user.raw) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ delete: false, error: "Error on delete user: " + error})
        }
    }

    public async findPod(req: Request, res: Response) {

            const webID = req.params.username;
        
            try {
                const myDataset = await getSolidDataset(
                    "https://" + webID  + ".inrupt.net/profile/card", {
                    fetch: fetch
                });
                
                const user = getThing(myDataset, "https://" + webID + ".inrupt.net/profile/card#me")
                const addressWebID = user!.predicates["http://www.w3.org/2006/vcard/ns#hasAddress"]["namedNodes"]
                const userAddress = addressWebID![0].split('#')[1]             
                if (userAddress === null){
                    return res.status(400).json({msg: "Address not found"});
                }
                
                let finalAddress = {} as AddressFields;
        
                const getAddress = getThing(myDataset, "https://" + webID + ".inrupt.net/profile/card#" + userAddress);    
                const country = getStringNoLocale(getAddress!, VCARD.country_name);
                const region = getStringNoLocale(getAddress!, VCARD.region);
                const locality = getStringNoLocale(getAddress!, VCARD.locality);
                const street = getStringNoLocale(getAddress!, VCARD.street_address);
                const postalCode = getStringNoLocale(getAddress!, VCARD.postal_code);
                if (country === null  ||region === null ||locality === null || street === null ||postalCode === null){
                    return res.status(400).json({msg: "Error finding the Address requirements"});
                } else {
                    finalAddress.country = country;
                    finalAddress.region = region;
                    finalAddress.locality = locality;
                    finalAddress.street = street;
                    finalAddress.postalCode = postalCode;
                }
            } catch (error) {
                return res.status(400).json({msg: "POD not found"})
            }
    }

    /**
     * Create user
     * @param req Request
     * @param res Response
     * @returns User with status 200 or error 500
     */
    public async addUser(req: Request, res: Response) {
        try {
            let salt = crypto.randomBytes(16).toString("hex");
            let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
            let userBody = new User(req.body.username, req.body.email, salt, hash, req.body.rol );
            const user = await UserService.addUser(req.app, userBody);
            user ? res.status(200).json(user) : res.status(500).json({ error: "Error add user" });
        } catch (error) {
            res.status(500).json({ error: "Error add user: " + error})
        }
    }

}