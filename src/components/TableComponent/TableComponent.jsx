import { Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/Loading';
import { Excel } from "antd-table-saveas-excel";


const TableComponent = (props) => {

    const {selectionType = 'checkbox', data: dataSource = [], isLoading= false, columns=[], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
      const arr = columns?.filter((col) => col.dataIndex !== 'action')
      return arr
    }, [columns])

    console.log('newColumnExport', newColumnExport)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
      const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet("sheet 1")
          .addColumns(newColumnExport)
          .addDataSource(dataSource, {
            str2Percent: true
          })
          .saveAs("Excel.xlsx");
        };


  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }

  return (
    <div>
        <Loading isLoading={isLoading}>
          {rowSelectedKeys.length > 0 && (
            <div style={{
              background: '#1d1ddd', 
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={handleDeleteAll}
            >
              DELETE ALL
            </div>
          )}
          <button onClick={exportExcel}>Export Excel</button>
        <Table
            rowSelection={{
            type: selectionType,
            ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            {...props}
        />
        </Loading>
    </div>
  )
}

export default TableComponent