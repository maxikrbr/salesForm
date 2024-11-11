import json
import csv
import sys

def json_to_csv(json_data):
    try:
        # Load JSON data
        opportunities = json.loads(json_data)
        
        # Define CSV file name
        csv_file_name = 'opportunities.csv'

        # Open CSV file in write mode
        with open(csv_file_name, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=["name", "closeDate", "stageName", "amount", "storeUrl"])
            writer.writeheader()

            # Write JSON data to CSV
            for opp in opportunities:
                writer.writerow(opp)

        print(f"CSV file '{csv_file_name}' has been created successfully.")

    except json.JSONDecodeError:
        print("Error: The provided JSON is not valid.")
    except Exception as e:
        print(f"Error: {e}")

# Example JSON data (replace with your own JSON data)
if __name__ == "__main__":
    json_data = sys.argv[1]  # JSON data passed as a command-line argument
    json_to_csv(json_data)
