using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Options;

using VRPortal.BL.FileSource;
using VRPortal.Models;

namespace VRPortalNexGen.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AzureStorageController : ControllerBase
    {
        private ConfigurationManager ConfigurationManager;
        public AzureStorageController(IOptions<ConfigurationManager> configurationManager)
        {
            ConfigurationManager = configurationManager.Value;
        }
        readonly FileSourceBL fileSourceBL = new FileSourceBL();
        [HttpPost]
        public ComparisionOutput SaveConfiguration([FromBody] List<DataSourceColumnList> dataSourceColumnList)
        {
            try
            {
                Common common = new Common();
                RunSamples(dataSourceColumnList).Wait();
                ComparisionOutput finalOutput = new ComparisionOutput();
                return finalOutput;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task RunSamples(List<DataSourceColumnList> dataSourceColumnList)
        {
            Console.WriteLine("Azure Cosmos DB Table - Basic Samples\n");
            Console.WriteLine();

            string tableName = "demo1bc2f";

            // Create or reference an existing table
            CloudTable table = await Common.CreateTableAsync(tableName, ConfigurationManager.StorageConnectionString);

            try
            {
                // Demonstrate basic CRUD functionality 
                await BasicDataOperationsAsync(table, dataSourceColumnList);
            }
            finally
            {
                // Delete the table
                // await table.DeleteIfExistsAsync();
            }
        }

        private static async Task BasicDataOperationsAsync(CloudTable table, List<DataSourceColumnList> dataSourceColumnList)
        {
            // Create an instance of a customer entity. See the Model\CustomerEntity.cs for a description of the entity.
            DataSourceColumnList customer;
            string partitionKey = (dataSourceColumnList[0].FileName == null ? dataSourceColumnList[0].TableName : dataSourceColumnList[0].FileName) + "_" + (dataSourceColumnList[1].FileName == null ? dataSourceColumnList[1].TableName : dataSourceColumnList[1].FileName);
            foreach (var item in dataSourceColumnList)
            {
                item.PartitionKey = partitionKey;
                item.RowKey = item.Source;
                // Demonstrate how to insert the entity
                Console.WriteLine("Insert an Entity.");
                await SamplesUtils.InsertOrMergeEntityAsync(table, item);
            }

            // Demonstrate how to Update the entity by changing the phone number
            Console.WriteLine("Update an existing Entity using the InsertOrMerge Upsert Operation.");

            //await SamplesUtils.InsertOrMergeEntityAsync(table, customer);
            Console.WriteLine();

            // Demonstrate how to Read the updated entity using a point query 
            Console.WriteLine("Reading the updated Entity.");
            customer = await SamplesUtils.RetrieveEntityUsingPointQueryAsync(table, partitionKey, "DataSource1");
            Console.WriteLine();

            // Demonstrate how to Delete an entity
            //Console.WriteLine("Delete the entity. ");
            //await SamplesUtils.DeleteEntityAsync(table, customer);
            //Console.WriteLine();
        }

    }
}