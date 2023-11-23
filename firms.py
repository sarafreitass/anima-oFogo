import pandas as pd

# Filtrar os dados da tabela pelos piores incêndios florestais baseados nos atributos de 'brightness' e 'bright_t31'
def filtrar_dados(arquivo_csv, num_registros, arquivo_saida):
    # Carregue o arquivo CSV usando o Pandas
    df = pd.read_csv(arquivo_csv)
    
    # Filtrar os registros com valor diferente de zero na última coluna
    df = df[df[df.columns[-1]] == 0]
    
    # Ordene o DataFrame com base nas colunas 'brightness' e 'bright_t31'
    df.sort_values(by=['brightness', 'bright_t31'], ascending=[False, False], inplace=True)
    
    # Selecione os primeiros 'num_registros' registros
    registros_selecionados = df.head(num_registros)
    
    # Salve os registros selecionados em um novo arquivo CSV
    registros_selecionados.to_csv(arquivo_saida, index=False)

if __name__ == "__main":
    arquivo_csv = 'modis_2022_Brazil.csv'
    num_registros_selecionados = 200
    arquivo_saida = 'modis_2022_Brazil_filtro.csv'

    filtrar_dados(arquivo_csv, num_registros_selecionados, arquivo_saida)
    
    print(f"Registros selecionados salvos com sucesso no arquivo: {arquivo_saida}")


arquivo_csv = 'modis_2021_Brazil.csv'
num_registros_selecionados = 700
arquivo_saida = 'modis_2021_Brazil_filtro.csv'

filtrar_dados(arquivo_csv, num_registros_selecionados, arquivo_saida)



