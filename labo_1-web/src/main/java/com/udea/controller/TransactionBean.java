/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.controller;

import com.udea.entity.Clientes;
import com.udea.session.ClientesManagerLocal;
import java.io.Serializable;
import java.util.List;
import javax.ejb.EJB;

/**
 *
 * @author sebas
 */
public class TransactionBean implements Serializable {

    @EJB
    private ClientesManagerLocal clientesManager;

    private Clientes cliente;
    private List<Clientes> clientes;

    /**
     * Creates a new instance of TransactionBean
     */
    public TransactionBean() {
    }

    public List<Clientes> getClientes() {
        clientes = clientesManager.getAllClientes();
        return clientes;
    }

    public Clientes getDetails() {
        return cliente;
    }
}
