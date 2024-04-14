
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Category } from "src/categories/entities/category.entity";
import { Component } from "src/components/entities/component.entity";
import { Param } from "src/params/entities/param.entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";
import { Profile } from "src/users/entities/profile.entity";

import { Workflow } from "src/workflow/entities/workflow.entity";
import { Node } from "src/nodes/entities/node.entity";

import { Utilisateur } from "src/users/entities/users.entity";



export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        const typeOrmConfig: TypeOrmModuleOptions = {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: Number(configService.get('DB_PORT')) ,
            username: configService.get('DB_USER') ,
            password: configService.get('PASSWORD') ,
            database: configService.get('DATABASE'),
            entities:[Role,Utilisateur,Profile,Category,Component,Post,Param,Node,Workflow,Utilisateur],
            synchronize: configService.get('SYNCHRONIZE')
        }
        return typeOrmConfig;
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configservice),
    inject: [ConfigService]
}