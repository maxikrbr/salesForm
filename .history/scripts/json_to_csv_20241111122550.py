import json
import csv
import sys

def json_to_csv(json_data):
    try:
        opportunities = json.loads(json_data)
        
        csv_file_name = 'opportunities.csv'

        with open(csv_file_name, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=["name", "closeDate", "stageName", "amount", "storeUrl"])
            writer.writeheader()

            for opp in opportunities:
                writer.writerow(opp)

        print(f"CSV file '{csv_file_name}' has been created successfully.")

    except json.JSONDecodeError:
        print("Error: The provided JSON is not valid.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    json_data = sys.argv[1]
    json_to_csv(json_data)
