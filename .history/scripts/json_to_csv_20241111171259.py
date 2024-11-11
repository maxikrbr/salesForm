import json
import csv
import sys

def json_file_to_csv(json_file_path):
    try:
        with open(json_file_path, 'r') as json_file:
            opportunities = json.load(json_file)
        
        csv_file_name = json_file_path.replace('.json', '.csv')

        with open(csv_file_name, mode='w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=["name", "closeDate", "stageName", "amount", "storeUrl"])
            writer.writeheader()

            for opp in opportunities:
                writer.writerow(opp)

        print(f"CSV file '{csv_file_name}' has been created successfully.")

    except FileNotFoundError:
        print(f"Error: The file '{json_file_path}' was not found.")
    except json.JSONDecodeError:
        print("Error: The provided JSON file is not valid.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: Please provide the path to a JSON file.")
    else:
        json_file_path = sys.argv[1]
        json_file_to_csv(json_file_path)
