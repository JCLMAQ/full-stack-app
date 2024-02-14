import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma/prisma';
@Injectable()
export class DbConfigService {

 /*
    *   DataBase config
  */

 constructor(
  private configService: ConfigService,
  private prisma: PrismaService,
) {}


async searchConfigParam(configItemName: string): Promise<string> {
  // Search for config parameter in the DB, and if not found use the one in the .env config file
    // Return "" if no value found
  const configItem = await this.prisma.configParam.findUnique({where: { name: configItemName },})
  let valueToReturn = "";
  if(!configItem) {
      valueToReturn = this.configService.get<string>(configItemName) || "";
  } else {
      configItem?.value === null ? valueToReturn = this.configService.get<string>(configItemName) || "" : valueToReturn = configItem?.value
  }
  // If nothing found the value will be : ""
  return valueToReturn
}

async searchConfigParamEnvFirst(configItemName: string): Promise<string | undefined> {
  // TOBETESTED
  // Search for config parameter in .env config file, and if not found use the one in the DB
  // Return "" if no value found
  let valueToReturn = null;
  let configItem = null;
  const valueFromEnvFile = this.configService.get<string>(configItemName);
  if(valueFromEnvFile == "") {
      configItem = await this.prisma.configParam.findUnique({where: { name: configItemName },});
      configItem?.value == null ? valueToReturn = "" : valueToReturn = configItem?.value
  } else {
      valueToReturn = valueFromEnvFile;
  }
  valueFromEnvFile === null ? valueToReturn = configItem?.value : valueToReturn = valueFromEnvFile
  return valueToReturn
}

async objectToArray(objectToConvert: { [x: string]: unknown; }){
  //Convert an Object to an Array
  const arr: unknown[] = [];
  Object.keys(objectToConvert).map(function(key){
      arr.push({[key]:objectToConvert[key]})
      return arr;
  });
}




}
