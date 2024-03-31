namespace Web.Controllers.Admin;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Requests.Orders;
using Services;
using Services.DTOs.Orders;

[Authorize]
[Route("api/admin/orders")]
public class AdminOrdersController : OrdersController
{
    public AdminOrdersController(
        OrdersService ordersService,
        CartsService cartsService,
        EmailService emailService)
    : base(ordersService, cartsService, emailService) {}

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        try
        {
            await _ordersService.DeleteAsync(id);
            return Ok(new { Success = true });
        }
        catch
        {
            var errorMessage = "An error occured while deleting the order.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetAsync(string orderId)
    {
        try
        {
            var orderDTO = await _ordersService.GetAsync(orderId);
            return Ok(orderDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching order details.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            var ordersDTO = await _ordersService.GetAllAsync();
            return Ok(ordersDTO);
        }
        catch
        {
            var errorMessage = "An error occured while fetching orders.";
            return StatusCode(500, errorMessage);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(UpdateOrderRequest input)
    {
        try
        {
            var updateOrderDTO = MapToUpdateOrderDTO(input);
            var orderDTO = await _ordersService.UpdateAsync(updateOrderDTO);
            return Ok(orderDTO);
        }
        catch
        {
            var errorMessage = "An error occured while updating order.";
            return StatusCode(500, errorMessage);
        }
    }

    private UpdateOrderDTO MapToUpdateOrderDTO(UpdateOrderRequest request)
    {
        return new UpdateOrderDTO
        {
            OrderId = request.OrderId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Tel = request.Tel,
            Address = request.Address,
            DeliveryPrice = request.DeliveryPrice,
            Status = request.Status
        };
    }
}